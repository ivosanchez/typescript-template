<template>
<main>
  <!-- <div class="sub">
    Basler<br>
    Freilichtspiele<br>
    1959<br>
    19.31.August<br>
    im<br>
    Rosenfeldpark
  </div> -->
  <div class="title"><h1>404</h1></div>
  <div class="dancer"></div>
  <div class="lettering">
	<div class="sub">
		No<br>
		encontramos<br>
		esa<br>
		secci&oacute;n.<br>
		Por favor,<br>
		da la vuelta<br>
		a <n-link to="/">la p&aacute;gina de inicio</n-link>
  </div>

    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 594" role="presentation">
      <rect width="800" height="594"/> -->
      <!-- <g id="drawingletters">
        <ellipse class="cls-1" cx="80.26" cy="162" rx="44.24" ry="47.5"/>
        <line class="cls-1" x1="124.5" y1="35.5" x2="124.5" y2="226.5"/>
        <line class="cls-1" x1="162.5" y1="98.5" x2="162.5" y2="226.5"/>
        <ellipse class="cls-1" cx="244.76" cy="164" rx="47.74" ry="47.5"/>
        <ellipse class="cls-1" cx="244.76" cy="295" rx="47.74" ry="47.5"/>
        <line class="cls-1" x1="292.5" y1="357.5" x2="292.5" y2="294.5"/>
        <ellipse class="cls-1" cx="374.76" cy="293" rx="47.74" ry="47.5"/>
        <ellipse class="cls-1" cx="501.26" cy="293" rx="44.24" ry="47.5"/>
        <line class="cls-1" x1="457" y1="166.5" x2="457" y2="294.5"/>
        <ellipse class="cls-1" cx="632.76" cy="296" rx="47.74" ry="47.5"/>
        <ellipse class="cls-1" cx="373.76" cy="424" rx="47.74" ry="47.5"/>
        <ellipse class="cls-1" cx="244.01" cy="423" rx="47.99" ry="47.5"/>
        <line class="cls-1" x1="196" y1="418" x2="196" y2="549.5"/>
        <ellipse class="cls-1" cx="504.01" cy="423" rx="47.99" ry="47.5"/>
         <line class="cls-1" x1="456" y1="418" x2="456" y2="549.5"/>
        <ellipse class="cls-1" cx="632.76" cy="425" rx="47.74" ry="47.5"/>
        <ellipse class="cls-1" cx="728.76" cy="425" rx="47.74" ry="47.5"/>
      </g>
      <g id="rectangles">
        <rect x="246" y="165" width="193" height="130"/>
        <rect x="473" y="424" width="327" height="130"/>
        <rect x="410" y="486" width="90" height="80"/>
        <rect x="246" y="422" width="63" height="80"/>
        <rect x="508" y="214" width="60" height="80"/>
        <rect x="633" y="294" width="76" height="67"/>
      </g> -->
   <!-- </svg> -->
  </div>

  <div class="border">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 1000" role="presentation" preserveAspectRatio="none"> 
      <line class="midborder" x2="100%" y2="100%" stroke="white" stroke-width="13px"/>
    </svg>
  </div>
</main>
</template>

<style lang="scss" scoped>
/*---- Scroll the window down! ---*/
*, html, body {
  background: rgba(0, 0, 0, 0.781);
  color: rgb(252, 215, 5);
  font-weight: bold;
  width: 100vw;
}
a{
	background:rgba(218, 165, 32, 0.87);
	padding:-4px;
}
main {
  display: grid;
  grid-template-columns: repeat(20, 5%);
  grid-template-rows: repeat(4, 25%);
}

.title {
  grid-column: 1 / span 3;
  grid-row: 2 / span 3;
}

.sub {
  grid-column-start: 2;
}

.dancer {
  grid-column: 5 / span 7;
  grid-row: 1 / span 4;
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/tumblr_nhznb4Jm2H1s238efo1_500.gif)
    no-repeat -100px -350px fixed;
  background-size: cover;
}

h1 {
  writing-mode: vertical-rl;
  font-size: 160px;
  float: left;
  margin-left: -20px;
  letter-spacing: -0.1em;
  color: goldenrod;
}

.lettering {
  grid-column: 12 / span 10;
  grid-row: 1 / span 4;
}

.sub2 {
  grid-column: 14 / span 3;
  grid-row: 4 / span 1;
  margin-top: -200px;
  font-size: 10px;
  text-align: right;
}

.border {
  grid-column: 12 / span 1;
  width: 10px;
  grid-row: 1 / span 4;
}

.cls-1 {
  fill: none;
  stroke: gold ;
  stroke-miterlimit: 10;
  stroke-width: 33px;
}

@media screen and (max-width: 800px) and (min-width: 500px) {
  .sub2 {
    grid-column: 17 / span 3;
    grid-row: 1 / span 1;
    margin-top: 0;
  }

  .border {
    grid-column: 7 / span 1;
    grid-row: 1 / span 4;
  }

  .dancer {
    grid-column: 7 / span 13;
    grid-row: 1 / span 4;
  }

  .lettering {
    grid-column: 7 / span 10;
    grid-row: 3 / span 4;
  }
}

@media screen and (max-width: 500px) {
  .sub {
    grid-column-start: 2;
    grid-row-start: 2;
    margin-left: 6px;
  }

  .sub2 {
    grid-column: 10 / span 10;
    grid-row: 2 / span 1;
  }

  h1 {
    writing-mode: unset;
    font-size: 80px;
    float: none;
    margin-left: 0;
    letter-spacing: -0.1em;
  }

  .title {
    grid-column: 1 / span 13;
    grid-row: 1 / 1;
  }

  .border {
    grid-column: 11 / span 1;
    grid-row: 2 / span 2;
  }

  .dancer {
    grid-column: 11 / span 10;
    grid-row: 2 / span 2;
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/tumblr_nhznb4Jm2H1s238efo1_500.gif)
      no-repeat 50px 60px fixed !important;
  }

  .lettering {
    grid-column: 1 / span 10;
    grid-row: 3 / span 4;
  }
}

		</style>
		<script>


// const tl = new TimelineMax(),
//   splitText = new SplitText('.sub, .sub2', {
//     type:'lines'
//   });

// tl.add('start')
// tl.fromTo('#drawingletters ellipse, #drawingletters line', 2.5, {
//   drawSVG: '-20% -20%',
//   stroke: 'teal'
// }, {
//   drawSVG: true,
//   stroke: 'white',
//   ease: Power3.easeOut
// }, 'start')
// tl.fromTo('#rectangles rect', 3, {
//   scaleX: 0,
// }, {
//   scaleX: 1,
//   ease: Power3.easeOut
// }, 'start')
// tl.fromTo('.midborder', 1, {
//   drawSVG: '40% 40%',
//   stroke: 'red'
// }, {
//   drawSVG: true,
//   stroke: 'white',
//   ease: Power3.easeInOut
// }, 'start+=1')
// tl.staggerFromTo(splitText.lines, 2.5, {
//   opacity: 0
// }, {
//   opacity: 1,
//   ease: Sine.easeOut
// }, 0.05, 'start+=2')
// tl.fromTo('h1', 2.5, {
//   opacity: 0
// }, {
//   opacity: 1,
//   ease: Sine.easeOut
// }, 'start+=2')

		</script>
