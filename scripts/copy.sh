cp ./data/animals.json ../rdr2-naturalist-almanac/ &&
cp ./data/animals-other.json ../rdr2-naturalist-almanac/ &&
cp ./data/plants.json ../rdr2-naturalist-almanac/ &&
cp ./data/all.json ../rdr2-naturalist-almanac/ &&
git add * && git commit -m\"Update data files- `date +'%Y-%m-%d %H:%M:%S'`\" &&
git push &&
cd ../naturalist.guide/