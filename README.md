# Motivation

I want a blog, and I want to spend exactly $0. Right now I could... 
- Hop on the free tier of some existing platform. Wordpress.com, Medium, etc. Fine, acceptable choice. But you don't actually own it on there, and you're dependent on whichever subscription model you find yourself locked into.
- Use github pages and a static website generator. Write posts in Markdown, and do some kind of build hook. Pros: this is totally free. Cons: I have co-authors who are very not technical, and "write in markdown and push to github" is a bit too much of a technical burden. Also, I'd like to mess around with non-static serverside stuff.
- Pay for like an EC2 instance and host it there. Blah. Costs money even if trivial, requires AWS effort.

So, the solution I've come up with is...
- Statically generated NextJS site
- Login system for to unlock editing
- (when authorized) Rich text WYSIWYG editor on all posts
- Saving a post calls a serverless function which creates a commit which triggers a rebuild of the static site
- host on vercel free tier, easy setup, lord knows im not setting up my own CICD

Pros: Works well enough, free. Extremely forkable, you can deploy this in one click. All files are stored in JSON in the repository. No DB.
Cons: Dependent on Vercel free tier (seems good enough for my needs). Delay between clicking publish and seeing your post is a minute or two (and will only get worse with a nontrivial number of posts). I don't think incremental static regeneration will work either. OAuth login only (was the easiest to setup). 

All in all, if you want a free, content editable blog that is all yours, this is it. If i grow out of vercel i'll hopefully have the $1 a month to spend on AWS lambda
