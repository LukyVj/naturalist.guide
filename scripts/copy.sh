# Copy all data files to /data/
cp -R ./data/ ../rdr2-naturalist-almanac/data/ &&

# Copy all image files to /cdn/
cp -R ../rdr2-naturalist-almanac/animals/ ../rdr2-naturalist-almanac/cdn/animals &&
cp -R ../rdr2-naturalist-almanac/habitats/ ../rdr2-naturalist-almanac/cdn/habitats &&
cp -R ../rdr2-naturalist-almanac/maps/ ../rdr2-naturalist-almanac/cdn/maps &&
cp -R ../rdr2-naturalist-almanac/plants/ ../rdr2-naturalist-almanac/cdn/plants &&

# Craft Git commit and push
git add * && git commit -m\"Update data files- `date +'%Y-%m-%d %H:%M:%S'`\" &&
git push &&

# Go back to this project
cd ../naturalist.guide/