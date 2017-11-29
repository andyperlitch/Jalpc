jekyll build
npm run resume
rsync -av _site/ ocean:~/sites/andyperlitch.net/current/
