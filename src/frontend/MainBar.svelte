<style>
  #main-bar {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--width);
    height: var(--height);
    margin-top: var(--margin-top);
    margin-left: var(--margin-left);
  }
</style>

<script>
  let widthVw = 50;
  let heightVh = 4;
</script>

<input style="--width: {widthVw}vw; --height: {heightVh}vh; --margin-top: -{heightVh/2}vh; --margin-left: -{widthVw/2}vw" id="main-bar" type="text" />
