# jquery-proximity-glow
jQuery plugin that allows elements to glow more or less based on mouse proximity.

[![Latest release](https://img.shields.io/github/release/pstrinkle/jquery-proximity-glow.svg)](https://github.com/pstrinkle/jquery-proximity-glow/releases/latest)
[![npm](https://img.shields.io/npm/v/jquery-proximity-glow.svg)](https://www.npmjs.com/package/jquery-proximity-glow)

Plans
-----

See issues.

Usage
-----
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/libs/jquery-proximity-glow/jquery.proximity-glow.min.js"></script>

<div>
  <button id='glowButton_1' type="submit">Button</button>
</div>

<script>
    $('#glowButton_1').proximityGlow({color: 'blue'});
</script>
```

Options
-------
You should specify options like in usage example above.

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| color | css string | `#fff` | Color for the glow. |
| inverse | boolean | true | If true, it grows larger as you get closer, false is the opposite. |
| shadowType | string | `box-shadow` | Whether to use `box-shadow` or `text-shadow`. |
| maxBlurSize | integer | `180` | Pixels for maximum glow size (spread := size/2). |

License
-------
[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)