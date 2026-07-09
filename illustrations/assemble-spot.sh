#!/usr/bin/env bash
# Assemble the Pixl spot: 5 i2v shot clips, beat-timed to the VO, VO muxed on top.
# No music (per brief). Locked to the voice-over length.
set -euo pipefail
export LC_ALL=C   # force '.' decimals for awk/ffmpeg (system may be fr_FR)

cd "$(dirname "$0")/.."
SH=public/video/shots
WK=public/video/work
OUT=public/video/pixl-spot.mp4
mkdir -p "$WK"

# beat durations (s), aligned to the VO beats
shots=(spot-01-command spot-02-horizon spot-03-assemble spot-04-core spot-05-logo)
durs=(4.0 3.0 5.0 3.0 5.0)
XF=0.4

# 1) normalize + trim each shot
n=${#shots[@]}
for i in $(seq 0 $((n-1))); do
  s=${shots[$i]}; d=${durs[$i]}
  ffmpeg -y -loglevel error -i "$SH/$s.mp4" -t "$d" \
    -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,setsar=1,fps=30,format=yuv420p" \
    -an "$WK/c$i.mp4"
done

# 2) xfade chain
inputs=(); for i in $(seq 0 $((n-1))); do inputs+=(-i "$WK/c$i.mp4"); done
# build filter: chain xfades, offset accumulates (dur - XF each step)
filter=""; prev="0:v"; off=0
for i in $(seq 1 $((n-1))); do
  # offset = sum(durs[0..i-1]) - i*XF
  off=$(awk -v a="${durs[*]:0:$i}" -v xf="$XF" -v i="$i" 'BEGIN{s=0;split(a,arr," ");for(k in arr)s+=arr[k];printf "%.3f", s - i*xf}')
  lab="v$i"
  filter+="[${prev}][$i:v]xfade=transition=fade:duration=$XF:offset=$off[$lab];"
  prev="$lab"
done
# strip trailing ; and add fade in/out
filter="${filter%;}"
ffmpeg -y -loglevel error "${inputs[@]}" -filter_complex \
  "${filter},fade=t=in:st=0:d=0.3,format=yuv420p[vout]" \
  -map "[vout]" -c:v libx264 -pix_fmt yuv420p "$WK/silent.mp4"

# 3) pad video to the VO length (freeze last frame if VO is longer), mux VO, no music
VO=$WK/vo.m4a
VOD=$(ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 "$VO")
ffmpeg -y -loglevel error -i "$WK/silent.mp4" -i "$VO" \
  -filter_complex "[0:v]tpad=stop_mode=clone:stop_duration=6,fade=t=out:st=$(awk -v d="$VOD" 'BEGIN{printf "%.2f", d-0.6}'):d=0.6[v]" \
  -map "[v]" -map 1:a -t "$VOD" \
  -c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 160k "$OUT"

echo "=== $OUT ==="
ffprobe -v error -show_entries format=duration:stream=width,height -of default=nw=1 "$OUT" 2>/dev/null
ls -la "$OUT"
