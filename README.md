# metaquery

A declarative breakpoint syntax. Defined in `<meta>`

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/benschwarz/metaquery/master/metaquery.min.js
[max]: https://raw.github.com/benschwarz/metaquery/master/metaquery.js

In your markup:

    <!doctype html>
    <html>
      <head>
        <meta name="breakpoint" data="phone" media="(max-width: 480px)">
        <meta name="breakpoint" data="small-tablet" media="(min-width: 480px) and (max-width: 600px)">
        <meta name="breakpoint" data="tablet" media="(min-width: 600px) and (max-width: 1024px)">
        <meta name="breakpoint" data="widescreen" media="(min-width: 1024px)">
        
        <script src="./modernizr.min.js"></script>
  
        <style>
          .breakpoint-phone { background: red; }
          .breakpoint-small-tablet { background: green; }
          .breakpoint-tablet { background: blue; }
          .breakpoint-widescreen { background: yellow; }
        </style>
      </head>
      <body>
        <img src="./images/phone.jpg" data-mq-src="./images/[breakpoint].jpg">
      </body>
      <script>
        Modernizr.load([
          {
            test: (!!window.matchMedia),
            nope: ['./js/vendor/matchMedia-chuck.js']
          },
          {
            load: './js/metaquery.js'
          }
        ]);
      </script>
    </html>

Dependencies (for this example - you can run meta query without those, but beware of browser support):

 1. modernizr.com/download
 2. github.com/paulirish/matchMedia.js
 3. metaquery!

Now you'll have access to the breakpoints that you've defined in three places:

* Via the CSS classes `.breakpoint-<name-of-breakpoint>` (shorter than media queries, no repeating yourself)
* Via responsive image tags (use the declarative interface for defining a convention, then build with that)
* Bind additional events in Javascript by inspecting the `MediaQueryList` objects via the `metaQuery.breakpoints` hash

# Browser support / Older browsers

## Note: These aren't going to work until I figure out addListener support for `matchMedia.js`

* ~~IE < 8 doesn't support media queries. Considering using [respond.js][respond.js]~~
* ~~Add the [matchMedia][matchMedia.js] polyfill for < Chrome 10, Firefox 6, Safari 5.1~~
    metaQuery.breakpoints.phone.mq.addListener( myCallbackMethod );
    
Heres a more full example: 

    (function (metaQuery) {
      metaQuery.breakpoints.phone.mq.addListener(function( mq ) {
        if( mq.matches ) {
          // media query matched, do something
        } else {
          // media query didn't match do something else
        }
      });
    }(metaQuery));

## Backstory

I worked on a large HTML magazine that is edited by an editorial team. Each 'module' of a template is responsive, and requires unique styles and sometimes even scripts. After reflecting on the project for some time, what worked, what didn't I made some simple observations: 

* Writing media queries over and over again sucks. (Even though I used [the technique][responsive-design-with-sass] that I illustrated back in December 11')
* If you want media query access in javascript, you'll create another media query with `matchMedia`
* [picturefill][picturefill] is the best responsive image technique I've seen… until I authored templates for a massive magazine. The syntax is too long and easy to forget. 
* and finally, a summary of all three: a declarative interface is far nicer to use.

After reading [Matt Wilcox's article], and the source of [picturefill][picturefill] I decided to get my hands dirty and have a go at a slightly better approach. 

## Contributing
Please use [idiomatic.js][idiomatic.js] as a styleguide and take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Ben Schwarz  
Licensed under the MIT license.


[respond.js]: https://github.com/scottjehl/Respond
[matchMedia.js]: https://github.com/paulirish/matchMedia.js
[picturefill]: https://github.com/scottjehl/picturefill
[Matt Wilcox's article]: http://mattwilcox.net/archive/entry/id/1091/
[responsive-design-with-sass]: http://theint.ro/blogs/outro/4686992-responsive-design-with-sass
[idiomatic.js]: https://github.com/rwldrn/idiomatic.js
[grunt]: https://github.com/cowboy/grunt