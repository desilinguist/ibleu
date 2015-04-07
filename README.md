# ibleu
A visual and interactive scoring environment for machine translation systems.


##### NOTE: Requires the latest version of Firefox (v4 or higher at least)* 

## Introduction

Currently, research in machine translation is evaluated by scoring the output of the system against human-authored "reference" translations. However, this scoring is generally done on the command line with almost no user interaction whatsoever. This project tries to use state-of-the-art web technologies (HTML5, CSS and Javascript) to provide a visual and interactive way to score machine translation output. It runs locally in the user's browser and includes all external dependencies. 

iBLEU allows exploring the output of a single system as well as comparing the outputs from two different sytems. It also allows users to query Google Translate or Bing Translator for comparison.

Since the tool relies on the latest version of the web technologies (Javascript v1.8, HTML5 and CSS3), you must use a browser that supports all of these technologies. Currently, the best option is the latest release of [Mozilla Firefox](http://www.getfirefox.com) (v4 or higher; latest version recommended).

## How to use it?

[Here's](http://www.youtube.com/watch?v=ajuiktswmcw") a video showing how to use iBLEU. For best results, I recommend that you watch the video in HD. Also, the download comes with a bunch of demo XML files so you can try the tool immediately after downloading. 

## Frequently Asked Questions

#### What is the point of iBLEU?

While working on my dissertation on statistical machine translation, I had to examine translation 
output for quality again and again. The way I used to do it was to open the source XML in one terminal 
window, the hypothesis XML system in another, the references in yet another window and the document/segment 
BLEU scores in a fourth window. I would then try to find documents with segments that had anomalously high/low 
BLEU scores and then copy paste the source into my browser to see how Google translated it. Things would be even 
worse if I was comparing my system to a baseline system.

This tool allows you to drill down into documents and perform this sort of qualitative examination 
and comparison in a very visual and interactive manner. It's not perfect by any means but I think it's 
interesting and probably useful to many people in the community.

#### Why the browser?
In the last five years, every major browser maker (Mozilla, Apple and Google) has invested a lot of effort 
into heavily optimizing its specific implementation of Javascript interpreters/compilers. 
Javascript, the language itself, has also matured and has gained a very useful set of third-party libraries.
On top of that, with the advent of HTML5 and CSS2/CSS3, it has become almost trivial to do interesting 
visualizations in the browser. 

These thoughts, coupled with the fact that everyone (and, I mean, everyone) has a browser, made me 
curious enough to try and create this tool. 

#### Why BLEU?
It's still the most frequently used metric in the machine translation community and probably 
the simplest to implement. This tool contains a pure Javascript implementation of the 
BLEU metric (based on the NIST mteval script v13a). Porting BLEU to Javascript was really 
pretty easy given how mature the language has become.

#### What do all the numbers mean ?
In short: the BLEU score for a set of translations translation is 
defined as the product of two numbers --- an n-gram precision score (what percentage of the n-grams 
or phrases from the translations also appear in the reference translations) and a 
brevity penalty (a number indicating if the translations are too short compared to the reference, 
a brevity penalty of `1.0` means that the lengths of the translations and the references are 
quite close to each other). For example, if the n-gram precision score is `0.0442` 
and the brevity penalty is `0.8356`, the final BLEU score is `0.0442 x 0.8356 = 0.0370`. 
In machine translation literature, the convention is to report BLEU scores as percentages. 
Therefore, iBLEU reports `0.0370 as 3.70`. Good quality translations will have BLEU scores 
closer to `1.0` (or `100.0` in iBLEU). Generally, BLEU scores against a 
single reference translation are lower than if you have multiple reference 
translations since then the translation has a better chance of matching some of the n-grams. 
However, if you want to use multiple reference translations, you need to use the XML format since 
there is no way to specify multiple reference translations using TXT files. For more details, 
please refer to the [BLEU Wikipedia page](http://en.wikipedia.org/wiki/BLEU).

#### What is the format for the XML files?*
The format is the official NIST XML format as described in this [DTD](ftp://jaguar.ncsl.nist.gov/mt/resources/mteval-xml-v1.5.dtd). Please make sure that the XML files you are using are valid XML and compliant with this DTD. 
This DTD is also included with the official release download zip file. 

#### Can I use plain text files instead?
Indeed, you can! However, note that: 

1. iBLEU currently relies on the file extension to decide whether the file is a plain TXT file 
 or an XML file. So, the names of all plain TXT files should end with '.txt'. 

2. Note that there should be the same number of lines in all the text files.  

3. Since text files are flat, there is no information like document IDs or system IDs etc. that are 
 generally provided by XML files. So I had to make up names like 'fakedoc', 'fakesys' to make things work.

4. For the same reason, text files cannot provide the name of the source language whereas XML 
 files do provide that information. iBLEU needs the name of the source language if you want 
 to compare to Bing or Google Translate. To do this, I am using the Bing and Google Translate 
 API to automatically detect the language. 

#### What if my files are already tokenized?
By default, iBLEU will tokenize any files input to it. However, I recognize that 
this may not always be necessary, e.g., if you have already tokenized the files 
on your end. To prevent tokenization, you can check the 'Do not tokenize' checkbox. 
**NOTE**: this may lead to BLEU scores that are different from those produced by the 
official BLEU script since you are no longer using the default bleu tokenization. 

#### Why only Mozilla Firefox and only the latest version?
This tool relies on the latest versions of HTML (HTML5), Javascript (v1.8) and CSS (CSS2/CSS3) 
and Firefox currently provides the best implementation of these technologies on all three major 
platforms (Mac, Windows and Linux).

#### What third party libraries is ibleu using?
I used two third party libraries for this project. The first is [jquery](http://jquery.com/), a fantastic 
Javascript library that makes interacting with the DOM extremely easy. The second is [highcharts](http://www.highcharts.com), 
a very powerful charting/graphic library that works with query. For older versions of iBLEU, I was using 
[flot](http://flot.googlecode.com), a different charting library but was not as nice as high charts. 

#### Why use Google Translate and/or Bing Translator?
Google and Bing currently have the best *publicly available* statistical machine translation systems and so it's only natural to want to compare against them as a benchmark. Obviously, the publicly available translation systems may be different from the respective research translation system that folks in the MT community are generally familiar with but they are useful benchmarks nonetheless. 

#### Hasn't Google shut down free access to their API?
Indeed, they [have](http://googlecode.blogspot.com/2011/05/spring-cleaning-for-some-of-our-apis.html). You now have to pay for it unless you are okay with just using the Bing Translator. 

#### Where do I sign up for the Translation API keys that I need to use compare to Google/Bing?
For Google, go [here](https://code.google.com/apis/console/) and for Bing, go [here](http://www.bing.com/developers/).

#### Why do the XML files need to be local files? Can't I specify URLs instead?
Even thought this may appear technically trivial, I cannot include such a feature simply because of the way that browsers approach this issue. In short, loading remote XML via Javascript is considered a security breach and so *all* modern browsers (including Firefox) follow what's called the 'same-origin' policy for web requests which means that XML files can only be loaded from the *same* domain on which the javascript code is being hosted. 

Since ibleu is running locally on one's computer, loading XML files from a remote web server will run afoul of this policy and be blocked. There are several possible workarounds to this but two of them are not ideal because one makes the tool impossible to run locally (which was one of my original goals for ibleu) and the other requires massaging the XML file into another format (which is not particularly user friendly). THe following are the possible solutions, none of them ideal:

I could route the remote request via a PHP script but that would mean that the user would need to have a webserver installed on one's machine with PHP running. This makes the barrier to entry rather high and I want ibleu to be something you can just download and use without a lot of setup.

If we change to the XML to a web-friendly JSONP format (http://en.wikipedia.org/wiki/JSONP), we can do this but that would mean that one would need to deal with yet another format and more massaging on the user side. I am not sure how many people would do that.

The latest version of Firefox supports what's called 'Cross Origin Resource Sharing' which allows for one domain to remotely load resources (read: XML files) hosted on another domain PROVIDED that the web server at the requestee domain is configured to *trust* the requester domain. This means that one can only load XML files from web servers that are configured in such a manner. If you can convince your IT staff to configure their webserver to allow this (or check whether it already allows this), I can probably build this functionality in. However, this need to be enabled on a per domain basis; definitely not an ideal solution.

Obviously, the simplest workaround (write a simple bash script to wget the remote URLs rather than passing XML files around) still holds.

#### What do the blue and red colors indicate in the different scenarios?
In the single system mode, words that are marked in red between the hypothesis and the reference(s) are the words that are different. Words that are in black have been determined to be identical using a longest common subsequence algorithm. This is useful to see what the system got right and, more importantly, what it got wrong. Similarly, in two system mode, words marked in blue in the two hypotheses being compared are the words that are different. Generally, this is useful because when comparing two hypotheses, it is useful to immediately see why the two are different. 

#### Why is the id for my hypotheses shown as undefined?
This generally happens because your XMLs are not compliant with the NIST [DTD](ftp://jaguar.ncsl.nist.gov/mt/resources/mteval-xml-v1.5.dtd). Please refer to the DTD (now also included in the download) to make sure that the XML files are compliant.

 #### Why doesn't Bing Translator work but Google Translate does?
Bing Translator's API requires that the source language be explicitly provided in the API call but Google Translate doesn't. So there are two possible reasons for this: (a) your XMLs don't specify the source language as required by the [NIST DTD](ftp://jaguar.ncsl.nist.gov/mt/resources/mteval-xml-v1.5.dtd) or (b) you are trying to translate a source language that I may not be telling Bing Translator about properly. As of now, ibleu properly supports French, German, Spanish, Hungarian, Czech, Danish, Dutch, Arabic and Chinese. If you want me to add another language, please email me and I will do so. 

#### What's in store for the future?
I have added a bunch of new features recently and I am not sure what is next. If you have ideas, please drop me a line. Note that things tend to move a bit slowly since ibleu is just something that I work on during weekends. 

#### How do I cite iBLEU?
If you are using iBLEU in your work and would like to cite it, please use the following citation:

Nitin Madnani. iBLEU: Interactively Debugging & Scoring Statistical Machine Translation Systems. Proceedings of the Fifth IEEE International Conference on Semantic Computing. 2011.

#### Who are you?
I am [DesiLinguist](http://www.desilinguist.org). 
