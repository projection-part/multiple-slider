# multiple-slider

A lightweight, modern React slider/carousel component.  
Supports autoplay, infinite looping, swipe gestures, keyboard navigation, custom arrows, and multiple slides per view.

---

## Features

- Autoplay support
- Infinite loop animation
- Swipe / touch support
- Keyboard navigation (← →)
- Navigation dots
- Customizable arrows
- Multiple slides per view (`slidesToShow`)
- Lightweight & dependency-free

---

## Installation

```bash
npm install multiple-slider
```

# Must import
```bash
import "multiple-slider/dist/slider.css";
```
## Basic Usage
```bash
import "multiple-slider/dist/slider.css";
import { MultiSlider } from 'multiple-slider';
function App() {
  const setting = {
  autoplay:false,
  interval:500,
  showDots:true,
  showArrows:true,
  infinite:false,
  slidesToShow:1
}
  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <MultiSlider {...setting}>
        <img src="https://picsum.photos/400/200?1" />
        <img src="https://picsum.photos/400/200?2" />
        <img src="https://picsum.photos/400/200?3" />
      </MultiSlider>
    </div>
  );
}

export default App;
```
# Advance Example
```bash
<MultiSlider
  autoplay
  infinite
  slidesToShow={2}
  prevArrow={<span>⬅</span>}
  nextArrow={<span>➡</span>}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
</MultiSlider>
```
```bash
import "multiple-slider/dist/slider.css";
import { MultiSlider, MultipleSlider } from 'multiple-slider';
function App() {
  const setting = {
  autoplay:true,
  interval:2000,
  showDots:false,
  showArrows:true,
  infinite:true,
  slidesToShow:1
}

const sett = {
  autoplay: true,
  infinite:true,
  slidesToShow:3
}
  return (
    <>
    <div style={{height:"auto", margin:" auto" }}>

{/*Slider 1*/}
      <MultiSlider {...setting}>
        <img src="https://picsum.photos/400/200?1" style={{width:"100%", height:"600px"}} />
        <img src="https://picsum.photos/400/200?2" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        
      </MultiSlider>



{/*Slider 2*/}
      <MultipleSlider>
        <img src="https://picsum.photos/400/200?1" style={{width:"100%", height:"600px"}} />
        <img src="https://picsum.photos/400/200?2" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
        <img src="https://picsum.photos/400/200?3" style={{width:"100%", height:"600px"}}  />
      </MultipleSlider>
    </div>


{/*Slider 3*/}
    <div style={{width:"100%"}}>
    <MultipleSlider {...sett}>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
        <div style={{height:"450px", backgroundColor:"red"}}>1</div>
</MultipleSlider> 
</div>
    </>
  );
}

export default App;
```