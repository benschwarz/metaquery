# metaquery <img src="https://benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30">

A declarative responsive web design syntax. Breakpoints, defined in `<meta>`
With metaquery, you define your media query breakpoints once, and only once.

([Demo](http://benschwarz.github.com/metaquery/requestanimationframe.html))

— by [@benschwarz](http://twitter.com/benschwarz)

## Getting Started

Install via Bower `bower install metaquery`

Otherwise, if you want to grab it manually:

Download the [production version][min] (416 bytes) or the [development version][max].

[min]: https://raw.github.com/benschwarz/metaquery/master/metaquery.min.js
[max]: https://raw.github.com/benschwarz/metaquery/master/metaquery.js
---

* Define your breakpoints in `<meta>` tags.

``` html
<meta name="breakpoint" content="phone" media="(max-width: 480px)">
<meta name="breakpoint" content="small-tablet" media="(min-width: 480px) and (max-width: 600px)">
<meta name="breakpoint" content="tablet" media="(min-width: 600px) and (max-width: 1024px)">
<meta name="breakpoint" content="widescreen" media="(min-width: 1024px)">
<meta name="breakpoint" content="retina" media="only screen and (-webkit-min-device-pixel-ratio : 2)">
```

* metaQuery will add/remove classes to the `<html>` node (`.breakpoint-<name-of-breakpoint>`) for you to utilise when the breakpoints are matched. (shorter than media queries. don't repeat yourself)

``` html
<style>
  .breakpoint-phone { background: red; }
  .breakpoint-small-tablet { background: green; }
  .breakpoint-tablet { background: blue; }
  .breakpoint-widescreen { background: yellow; }
</style>
```

* Responsive images in one simple line.

``` html
<img src="./images/phone.jpg" data-mq-src="./images/[breakpoint].jpg">
```

* Add modernizr to detect support for matchMedia, then use either the official [matchMedia.js][matchMedia.js] polyfill, or [my version that'll also work for IE7 & 8][matchmedia-oldie]

``` javascript
Modernizr.load([{
  test: ( !!window.matchMedia ),
  nope: ['./js/vendor/matchMedia-oldie.js']
}]);
```

## Adding your own javascript events with metaQuery.onBreakpointChange

Considering the HTML example above, say you wanted watch for 'phone' breakpoint changes:

``` javascript
metaQuery.onBreakpointChange( 'phone', function ( match ) {
  if( match ) { // phawor! your media query matches. }
});
```

and if you just want to fire an event whenever you switch breakpoints (but don't care which)

``` javascript
metaQuery.onBreakpointChange( function (activeBreakpoints) {
    // do something amazing because you've changed breakpoints!
    // your callback will also be passed an array containing the names of active breakpoints.
});
```

# Browser support

metaQuery requires `matchMedia`:

* Use the polyfill ([matchMedia.js][matchMedia.js])

Otherwise, metaQuery will work with all common desktop and mobile browsers.

## Browserify / CJS

metaQuery can be used with browserify. 

## Backstory

In 2011/12 I worked on a large HTML magazine that is edited by an editorial team. Each 'module' of a template is responsive, and requires unique styles and sometimes even scripts. After reflecting on the project for some time, what worked and what didn't, I made some simple observations:

* Writing media queries over and over again sucks. (Even though I use [the technique][responsive-design-with-sass] that I illustrated back in December 11')
* If you want media query access in javascript, you'll create yet another media query with `matchMedia`
* [picturefill][picturefill] is the best responsive image technique I've seen… until I authored templates for a massive magazine. The syntax is too long and easy to forget.
* and finally, a summary of all three: a declarative interface is far nicer to use.

After reading both [Jeremy Keith][Jeremy Keith's article] and [Matt Wilcox's][Matt Wilcox's article] articles, then the source of [picturefill][picturefill] I decided to get my hands dirty and have a go at a slightly better approach.

## Contributing
Please use [idiomatic.js][idiomatic.js] as a styleguide and take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Thanks to

Reviewers: Tim Lucas, Ben Alman, Jeremy Keith, Paul Irish, Divya Manian, David Desandro, Nicolas Gallagher and Mat Marquis

Code:

* Scott Jehl for writing picturefill, matchMedia.js (with Paul Irish) and respond.js. Legend.
* Dustin Diaz's teeny dom ready.

## License
Copyright (c) 2012 Ben Schwarz
Licensed under the MIT license.

[matchMedia.js]: https://github.com/paulirish/matchMedia.js
[matchmedia-oldie]: https://github.com/benschwarz/matchMedia.js/tree/IE7-8
[picturefill]: https://github.com/scottjehl/picturefill
[Jeremy Keith's article]: http://adactio.com/journal/5429/
[Matt Wilcox's article]: http://mattwilcox.net/archive/entry/id/1091/
[responsive-design-with-sass]: http://theint.ro/blogs/outro/4686992-responsive-design-with-sass
[idiomatic.js]: https://github.com/rwldrn/idiomatic.js
[grunt]: https://github.com/cowboy/grunt
