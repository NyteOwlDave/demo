<head> <link rel="icon" href="./rolling-cube.png" /> </head>

<style>
@import url("./../../style/every-page.css");
</style>

[html-lists]:
<https://blog.frankmtaylor.com/2026/05/13/you-dont-know-html-lists/>
"CodePen Article"

[me-tower]:
<http://dave-tower/demo/web/gadgets/list-types.html>
"Tower Edition"

----------------------------------------------------------------

# Multiselect

<div center>
<select name="languages" multiple>
  <option value="">Select a Language</option>
  <option value="en">English</option>
  <option value="fr">French</option>
  <option value="es">Spanish</option>
  <option value="pt">Portuguese</option>
  <option value="en">Irish</option>
  <option value="cy">Welsh</option>
</select>
</div>

----------------------------------------------------------------

# Option Groups

<div center>
<select name="languages">
  <optgroup label="Germanic">
    <option value="en">English</option>
  </optgroup>
  <optgroup label="Romance">
   <option value="fr">French</option>
   <option value="es">Spanish</option>
   <option value="pt">Portuguese</option>
  </optgroup>
  <optgroup label="Celtic">
   <option value="en">Irish</option>
   <option value="cy">Welsh</option>
  </optgroup>
</select>
</div>

----------------------------------------------------------------

# Sizing Limits

<div center>
<select name="languages" size="4" multiple>
  <optgroup label="Germanic">
    <option value="en">English</option>
  </optgroup>
  <hr />
  <optgroup label="Romance">
   <option value="fr">French</option>
   <option value="es">Spanish</option>
   <option value="pt">Portuguese</option>
  </optgroup>
  <hr />
  <optgroup label="Celtic">
   <option value="en">Irish</option>
   <option value="cy">Welsh</option>
  </optgroup>
  <hr />
  <optgroup label="Afroasiatic">
   <option value="he">Hebrew</option>
   <option value="ar">Arabic</option>
  </optgroup>
</select>
</div>

----------------------------------------------------------------

# Data List*

<datalist id="languages">
   <option>English</option>
   <option>French</option>
   <option>Spanish</option>
   <option>Portuguese</option>
   <option>Irish</option>
   <option>Welsh</option>
   <option>Hebrew</option>
   <option>Arabic</option>
</datalist>

<div center>
<input name="language" list="languages">
</div>

## * ReText Doesn't support datalists

----------------------------------------------------------------

# Data List Aliasing

<datalist id="languages">
   <option value="en">English</option>
   <option value="fr">French</option>
   <option value="es">Spanish</option>
   <option value="pt">Portuguese</option>
   <option value="en">Irish</option>
   <option value="cy">Welsh</option>
   <option value="he">Hebrew</option>
   <option value="ar">Arabic</option>
</datalist>

<div center>
<input name="language" list="languages">
</div>

----------------------------------------------------------------

# Custom Input Types

<div center>
<label for="camp-week">Choose a week</label>

<input
  type="week"
  name="week"
  id="camp-week"
  min="2026-W2"
  max="2026-W51"
  list="preferred-weeks"
/>
</div>

<datalist id="preferred-weeks">
  <option>2026-W22</option>
  <option>2026-W23</option>
  <option>2026-W24</option>
  <option>2026-W25</option>
</datalist>

----------------------------------------------------------------

<div center>
<div class="rangeField">
<label for="tips">Tip Percentage</label>

<input
  type="range"
  name="tips"
  id="tips"
  min="0"
  max="50"
  step="1"
  list="recommended-tips"
   />
</div>
</div>

<datalist id="recommended-tips">
  <option value="10" label="10%"></option>
  <option value="18" label="18%"></option>
  <option value="30" label="30%"></option>
  <option value="45" label="45%"></option>
</datalist>

<style>
.rangeField {

/* 
container for the two things
ch is the width of the 0 in computed font. 
Very precise for numbers */
  width: 50ch; 
}

/*same width for input and datalist*/
#recommended-tips,
#tips {
  width: 100%;
  margin: 0;
  padding: 0;
}

 #recommended-tips {
  position: relative;
  display: block;
  writing-mode: vertical-lr;
 }

</style>
</div>

----------------------------------------------------------------

# Ordered List

<div center>
<ol>
  <li>Pre-heat oven to 350 degrees and grease  a 9x5 pan.</li>
  <li>Combine flour, baking soda, and salt in large bowl with beaten brown sugar, butter, eggs, and mashed bananas</li>
  <li>If oven is pre-heated, pour batter into pan</li>
  <li>Bake for 60 minutes or until a toothpick inserted into the center comes out clean.</li>
  <li>Let cool on a wire rack</li>
</ol>
</div>

----------------------------------------------------------------

# Nested Lists

<div style="text-align : left">
<ol>
  <li>Prepare:
    <ul>
      <li>Preheat oven to 350 degrees</li>
      <li>Lightly grease a 9x5 pan</li>
      <li>Gather all ingredients</li>
    </ul>
  </li>
  <li>Mix:
    <ol>
      <li>Prepare bowl 1: Combine flour, baking soda, and salt in a large bowl
      </li>
      <li>Prepare bowl 2: 
         <ol>
            <li>Beat brown sugar and butter</li>
            <li>Stir in eggs and mashed bananas</li>
         </ol>
      </li>
      <li>Stir bowl 2 into bowl 1</li>
    </ol>
 </li>
  <li>Pour: Batter goes into pre-greased pan</li>
  <li>Bake:
    <ul>
      <li>Bake for 60 minutes&hellip;</li>
      <li>Or when a toothpick inserted in the center comes out clean</li>
    </ul>
  </li>
  <li>Cool:
    <ol>
      <li>let cool in the pan for 10 minutes</li>
      <li>Place on wire rack to finish cooling</li>
    </ol>
  </li>
</ol>
</div>

----------------------------------------------------------------

> [Codepen Article][html-lists]

----------------------------------------------------------------

> [Tower][me-tower]

----------------------------------------------------------------

> [File System](./)

----------------------------------------------------------------
