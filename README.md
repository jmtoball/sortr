# sortr
sortr is an indentation-aware sorting utility. Try it here: http://jmtoball.github.io/sortr/

## why

### tldr
Vanilla VIM couldn't do this.

### Let me tell you a story
I was often presented with CoffeeScript- or YAML-based configuration and localization files like this:

```
feep_foop: "fap"
 fip_fup: "fep"
 aip_aup: "aep"
  zipidee_zipidoo: "zip"
beep_boop: "bap"
 bip_bup: "bep"
  xipidee_xipidoo: "zip"
 cip_cup: "cep"
zeep_zoop: "zap"
```

Imagine this having 200 lines instead of eight. If you need to add or edit an entry, you either have to utilize a search function or be really good at scanning unordered sets of information. And you probably aren't, unless you're a machine. For us humans (and for machines alike, btw) it is much easier to scan such sets of information if we can assume that they are subject to a certain order. Machines may be fine with order concepts like digit sums of ASCII codes, but humans are more apt to familiar concepts like alphabetical order.

So this should feel much better, and also make it easier to add or edit sepcific entries as our eyes and brain can easily binary-search the entries for the one we're looking for:

```
beep_boop: "bap"
 bip_bup: "bep"
  xipidee_xipidoo: "zip"
 cip_cup: "cep"
feep_foop: "fap"
 aip_aup: "aep"
  zipidee_zipidoo: "zip"
 fip_fup: "fep"
zeep_zoop: "zap"
```

Unfortunately, despite its immense power, VIM did not just give me the functionality to sort a file while maintaining its indentation. Its `:sort` function would just do this to my utter dismay:

```
  xipidee_xipidoo: "zip"
  zipidee_zipidoo: "zip"
 aip_aup: "aep"
 bip_bup: "bep"
 cip_cup: "cep"
 fip_fup: "fep"
beep_boop: "bap"
feep_foop: "fap"
zeep_zoop: "zap"
```

I could have written a VIM script to do this in an indentation-aware way, but then again I'm a frontend developer and I like writing stuff that runs in a browser. So this is what I did.

## Technology

This is all built in pure HTML5 and JavaScript with Semantic UI lending me the grid system and style.

I was especially keen on having this all in pure JavaScript to see if I can still write this after years of CoffeeScript and JQuery having made me fat and lazy.

I did not take care about cross-browser functionality, but I would be interested in issues if someone is unsuccessfully trying to use it in a browser that is not deliberately old.

## TODO

- ~~Configure depth~~
- Support syntaxes that feature end tags/end statements (XML, Ruby)
- File Upload/Drag&Drop
