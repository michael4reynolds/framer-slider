import * as React from "react"
import { render } from "react-dom"
import { Frame, transform, useAnimation } from "framer"
import "./styles.css"

function Skinny(props) {
  return (
    <Frame
      width={290}
      height={320}
      position="relative"
      background="transparent"
    >
      <Frame
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fskinny-portrait.png)"
        width={290}
        height={290}
        borderRadius={150}
      />
      {/* Cheek */}
      <Frame
        background="url(https://cdn.glitch.com/071e5391-90f7-476b-b96c-1f51f7106b0c%2Fcheek.png)"
        width={79}
        height={67}
        left={155}
        top={135}
        scale={1.2}
        animate={props.cheekAnimate}
      />
    </Frame>
  )
}

function Slider(props) {
  return (
    <Frame
      width={280}
      height={15}
      borderRadius={30}
      position="relative"
      // center
      backgroundColor={"white"}
    >
      <Frame
        drag={"x"}
        dragConstraints={{ left: 0, right: 250 }}
        dragElastic={false}
        dragMomentum={false}
        onDrag={props.onSlide}
        size={60}
        borderRadius={30}
        center="y"
        backgroundColor={"white"}
        shadow="0 1px 5px 0 rgba(0, 0, 0, 0.25)"
      />
    </Frame>
  )
}

function App() {
  let animationControls = useAnimation()
  function handleDrag(event, info) {
    // Change the scale of Skinny's cheek
    let scale = transform(info.point.x, [0, 250], [0.4, 1.5])
    animationControls.start({
      scale,
      transition: { type: "spring", velocity: 0 }
    })
  }
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <Skinny cheekAnimate={animationControls} />
      <Slider onSlide={handleDrag} />
    </div>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)
