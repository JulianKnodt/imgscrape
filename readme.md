# imgscrape

A generic webscraper which takes
all the image srcs and srcsets off a page.
Works for any website that has infinite scroll.

## Usage

```
node ./phantomScrape.js <URL> > output.txt
mkdir outputDir
cd outputDir
cat ../output.txt | xargs ruby ../realize.rb 
```

# Please request more features.
