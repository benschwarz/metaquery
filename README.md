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
        <meta name="breakpoint" data="retina" media="only screen and (-webkit-min-device-pixel-ratio : 2)">
        
        <script src="./js/vendor/modernizr.js"></script>
  
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
            nope: ['./js/vendor/matchMedia-oldie.js']
          },
          {
            load: './js/metaquery.js'
          }
        ]);
      </script>
    </html>

Now you'll have access to the breakpoints that you've defined in three places:

* Via the CSS classes `.breakpoint-<name-of-breakpoint>` (shorter than media queries, no repeating yourself)
* Via responsive image tags (use the declarative interface for defining a convention, then build with that)
* Bind additional events in Javascript with `metaQuery.bind`

# Browser support

metaQuery requires `matchMedia` support: 

* Use the polyfill ([matchMedia.js][matchMedia.js])
* If you wish to support IE 7 & 8, use my variant ([matchMedia-oldie.js][matchmedia-oldie])

Otherwise, go for your life in Chrome, Safari, Firefox and New IE.

## How do I know if my browser supports matchMedia? 

Open a developer console, type `window.matchMedia`, if you get undefined, you'll need a polyfill.

## Adding your own javascript events

Considering the HTML example above, say you wanted watch for breakpoint changes:

    metaQuery.bind('phone', function (match) {
      if( match ) { // phawor! your media query matches. }
    });

## Backstory

I worked on a large HTML magazine that is edited by an editorial team. Each 'module' of a template is responsive, and requires unique styles and sometimes even scripts. After reflecting on the project for some time, what worked, what didn't I made some simple observations: 

* Writing media queries over and over again sucks. (Even though I used [the technique][responsive-design-with-sass] that I illustrated back in December 11')
* If you want media query access in javascript, you'll create another media query with `matchMedia`
* [picturefill][picturefill] is the best responsive image technique I've seen… until I authored templates for a massive magazine. The syntax is too long and easy to forget. 
* and finally, a summary of all three: a declarative interface is far nicer to use.

After reading [Matt Wilcox's article], and the source of [picturefill][picturefill] I decided to get my hands dirty and have a go at a slightly better approach. 

Internally, metaQuery uses a resize event handler, you may be thinking, "but wait — not all media queries are related to device width", While this is true. metaQuery will still execute onLoad, and when additional events are bound. For me, this is enough, disagree? Please add an issue. 

## Contributing
Please use [idiomatic.js][idiomatic.js] as a styleguide and take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

* 0.0.1 - Initial. Baller. Edition.

## Thanks to

Reviewers: Tim Lucas, Ben Alman, Jeremy Keith, Paul Irish, Divya Manian, David Desandro, Nicolas Gallagher and Mat Marquis

Code: 

* Scott Jehl for writing picturefill, matchMedia.js (with Paul Irish) and respond.js. Legend.
* Nico Wiedemann (EarMaster) for his add/remove/hasClass implementation //github.com/EarMaster/CSSClass
* Dustin Diaz's teeny dom ready.

## License
Copyright (c) 2012 Ben Schwarz  
Licensed under the MIT license.


[matchMedia.js]: https://github.com/paulirish/matchMedia.js
[matchmedia-oldie]: https://github.com/benschwarz/matchMedia.js/tree/IE7-8
[picturefill]: https://github.com/scottjehl/picturefill
[Matt Wilcox's article]: http://mattwilcox.net/archive/entry/id/1091/
[responsive-design-with-sass]: http://theint.ro/blogs/outro/4686992-responsive-design-with-sass
[idiomatic.js]: https://github.com/rwldrn/idiomatic.js
[grunt]: https://github.com/cowboy/grunt