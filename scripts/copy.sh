# Copy all data files to /data/
cp -R ./data/ ../rdr2-naturalist-almanac/data/ &&

# Copy all image files to /cdn/
# cp -R ../rdr2-naturalist-almanac/images/ ../rdr2-naturalist-almanac/cdn/ &&

sh ./scripts/git.sh &&
# # Go back to this project
cd ../naturalist.guide/