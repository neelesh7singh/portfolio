import { lerp, getMousePos } from "./utils";
import { TweenMax, Power3 } from "gsap";

// Grab the mouse position and set it to mouse state
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));
export default class Cursor {
    constructor(el) {
        this.Cursor = el;
        this.Cursor.style.opacity = 0;
        this.cursorConfigs = {
            x: { previous: 0, current: 0, amt: 0.2 },
            y: { previous: 0, current: 0, amt: 0.2 },
        };
        this.onMouseMoveEv = () => {
            this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
            this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y;

            TweenMax.to(this.Cursor, {
                duration: 1,
                ease: Power3.easeOut,
                opacity: 1,
            });
            // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
            requestAnimationFrame(() => this.render());
            window.removeEventListener("mousemove", this.onMouseMoveEv);
        };

        window.addEventListener("mousemove", this.onMouseMoveEv)
    }
    render() {
        this.cursorConfigs.x.current = mouse.x;
        this.cursorConfigs.y.current = mouse.y;

        // lerp
        for (const key in this.cursorConfigs) {
            // key will be x & y
            // WTF IS LERP?
            // Lerp - A lerp returns the value between two numbers at a specified, decimal midpoint:
            this.cursorConfigs[key].previous = lerp(
                this.cursorConfigs[key].previous,
                this.cursorConfigs[key].current,
                this.cursorConfigs[key].amt
            );
        }
        // Setting the cursor x and y to our cursoer html element
        this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;
        // RAF
        requestAnimationFrame(() => this.render());
    }
}