// The bounce maths, kept separate from the component so it can be tested
// without a browser. The preview pane never runs requestAnimationFrame, so
// this is the only way to actually check the corner case works.

export const CYCLE_LENGTH = 3;

/**
 * Advance one frame.
 * @param {{x:number,y:number,vx:number,vy:number,colour:number}} state
 * @param {number} dt seconds since the last frame
 * @param {{maxX:number,maxY:number}} bounds
 * @param {number} speed pixels per second
 * @returns {{x,y,vx,vy,colour, hitX:boolean, hitY:boolean, corner:boolean}}
 */
export function advance(state, dt, bounds, speed) {
  let { x, y, vx, vy, colour } = state;
  const { maxX, maxY } = bounds;

  x += vx * speed * dt;
  y += vy * speed * dt;

  let hitX = false;
  let hitY = false;

  if (x <= 0) {
    x = 0;
    vx = Math.abs(vx);
    hitX = true;
  } else if (x >= maxX) {
    x = maxX;
    vx = -Math.abs(vx);
    hitX = true;
  }

  if (y <= 0) {
    y = 0;
    vy = Math.abs(vy);
    hitY = true;
  } else if (y >= maxY) {
    y = maxY;
    vy = -Math.abs(vy);
    hitY = true;
  }

  // One colour step per bounce, not one per wall, so hitting a corner does not
  // skip a colour.
  if (hitX || hitY) colour = (colour + 1) % CYCLE_LENGTH;

  return { x, y, vx, vy, colour, hitX, hitY, corner: hitX && hitY };
}
