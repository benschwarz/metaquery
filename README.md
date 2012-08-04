# metaquery

A declarative responsive web design syntax. Breakpoints, defined in `<meta>`

With metaquery, you define your media query breakpoints once, and only once. 

([Demo](http://benschwarz.github.com/metaquery/images.html), [Demo](http://benschwarz.github.com/metaquery/css-classes.html))

— by [@benschwarz](http://twitter.com/benschwarz)

## Getting Started

Download the [production version][min] (723 bytes) or the [development version][max].

or, if you want the smaller (476 bytes!), lighter jQuery powered edition:

* [production jQuery version][minjq]
* [development jQuery version][maxjq]

[min]: https://raw.github.com/benschwarz/metaquery/master/metaquery.min.js
[max]: https://raw.github.com/benschwarz/metaquery/master/metaquery.js
[minjq]: https://raw.github.com/benschwarz/metaquery/master/metaquery.jquery.min.js
[maxjq]: https://raw.github.com/benschwarz/metaquery/master/metaquery.jquery.js

---

1. Define your breakpoints in `<meta>` tags.

``` html
<meta name="breakpoint" data="phone" media="(max-width: 480px)">
<meta name="breakpoint" data="small-tablet" media="(min-width: 480px) and (max-width: 600px)">
<meta name="breakpoint" data="tablet" media="(min-width: 600px) and (max-width: 1024px)">
<meta name="breakpoint" data="widescreen" media="(min-width: 1024px)">
<meta name="breakpoint" data="retina" media="only screen and (-webkit-min-device-pixel-ratio : 2)">
```

2. metaQuery will add/remove classes to the `<html>` node (`.breakpoint-<name-of-breakpoint>`) for you to utilise when the breakpoints are matched. (shorter than media queries. don't repeat yourself)

``` html
<style>
  .breakpoint-phone { background: red; }
  .breakpoint-small-tablet { background: green; }
  .breakpoint-tablet { background: blue; }
  .breakpoint-widescreen { background: yellow; }
</style>
```
    
3. Responsive images in one simple line. 

``` html
<img src="./images/phone.jpg" data-mq-src="./images/[breakpoint].jpg">
```

4. Add modernizr to detect support for matchMedia, then use either the official [matchMedia.js][matchMedia.js] polyfill, or [my version that'll also work for IE7 & 8][matchmedia-oldie]

``` javascript
Modernizr.load([{
  test: (!!window.matchMedia),
  nope: ['./js/vendor/matchMedia-oldie.js']
}]);
```

5. Bask in glory. 

## Adding your own javascript events with metaQuery.bind

Considering the HTML example above, say you wanted watch for breakpoint changes:

``` javascript
metaQuery.bind('phone', function (match) {
  if( match ) { // phawor! your media query matches. }
});
```

# Browser support

metaQuery requires `matchMedia`: 

* Use the polyfill ([matchMedia.js][matchMedia.js])
* If you wish to support IE 7 & 8, use my variant ([matchMedia-oldie.js][matchmedia-oldie])

Otherwise, metaQuery will work with all common desktop and mobile browsers. 

## Backstory

I recently worked on a large HTML magazine that is edited by an editorial team. Each 'module' of a template is responsive, and requires unique styles and sometimes even scripts. After reflecting on the project for some time, what worked and what didn't, I made some simple observations: 

* Writing media queries over and over again sucks. (Even though I use [the technique][responsive-design-with-sass] that I illustrated back in December 11')
* If you want media query access in javascript, you'll create yet another media query with `matchMedia`
* [picturefill][picturefill] is the best responsive image technique I've seen… until I authored templates for a massive magazine. The syntax is too long and easy to forget. 
* and finally, a summary of all three: a declarative interface is far nicer to use.

After reading both [Jeremy Keith][Jeremy Keith's article] and [Matt Wilcox's][Matt Wilcox's article] articles, then the source of [picturefill][picturefill] I decided to get my hands dirty and have a go at a slightly better approach. 

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
[Jeremy Keith's article]: http://adactio.com/journal/5429/
[Matt Wilcox's article]: http://mattwilcox.net/archive/entry/id/1091/
[responsive-design-with-sass]: http://theint.ro/blogs/outro/4686992-responsive-design-with-sass
[idiomatic.js]: https://github.com/rwldrn/idiomatic.js
[grunt]: https://github.com/cowboy/grunt
