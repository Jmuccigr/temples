#!/bash/bin

# Script to convert circle circle from existing markers

for i in marker-icon-2x-*.png
do magick $i -gravity south -chop 0x57 +repage \( +clone -flip \) -append "${i%.*}"_circle.png
done
