---
title: Making the database into a dataset for Google to find
author: John D. Muccigrosso
date: Wednesday, 3 October 2018
---


Starting from the blog post [here](https://ai.googleblog.com/2017/01/facilitating-discovery-of-public.html) which I saw on Twitter...

I moved on to [making a sitemap](https://support.google.com/webmasters/answer/183668) for the dataset. I decided to use the simple text version of a sitemap, which is simply a list of all the canonical URIs for the database. For our database, that's pretty simple. They all look like:

<https://romeresearchgroup.org/item/XXXXXXX>

Where XXXXXXX is the unique ID within the database for each temple, an integer starting at 1,000,001.

I then submitted the sitemap to Google via their Sitemap manager, using my private Google account, and verified my ownership of the site. (Didn't quite intend to do all this, but that's is where they sent me and it's not quite a secret anyway.) 

The Google docs were a bit weird to me, because they keep saying "dataset" where I would have said a single item in a database. This meaning is implicit in their initial definition, or set of definitions, which includes "A table or a CSV file with some data", which is how I tend to think of my entire database, **and** "A collection of files that together constitute some meaningful dataset", which seems recursively confusing, at best, **and** "A file in a proprietary format that contains data", which maybe is an individual record in a database. Here's where it seems to me that they mean individual entries:

> If you have a dataset repository, you likely have at least two types of pages: the canonical ("landing") pages for each dataset and pages that list multiple datasets (for example, search results, or some subset of datasets). We recommend that you add structured data about a dataset to the canonical pages.

There's no canonical page for the entire database (well, there is, I suppose, but they seem here to be referring to items within the database that clearly have such canonical pages), so I take this "dataset" to refer to each item.

In any case, I added a modified version of their sample 

Processing completed on the 7th, but it's taking weeks for the entire set to be evaluated for indexing. Some of the first ones Google is looking at are not being chosen as the canonical URI (some are losing out to other database pages!). Here's the error: *Submitted URL not selected as canonical*, so I added canonical meta tag to page HEAD via php for each of them.

Sunday, 4 November 2018: A few weeks later, only 7 pages of the dataset have been accepted, but they're listed as not appearing on Google. In several cases, the canonical URLs are other pages (in the database!). I've now asked for help on the Webmaster Central Help Forum Group. Today I also added some PHP so that the page's title gets set in the HTML instead of by javascript.
