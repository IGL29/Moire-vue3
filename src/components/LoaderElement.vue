<template>
<div class="container">
  <div class="circles">
    <div class="large-circle"></div>
    <div class="mid-circle"></div>
    <div class="small-circle"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'LoaderElement',
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
}
.circles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
}
.circles div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  transform-origin: top left;
}
.large-circle {
  background: #f03e3e;
  width: 75%;
  height: 75%;
  animation: grow cubic-bezier(0.785, 0.135, 0.15, 0.86) 3s infinite;
}
.mid-circle {
  background: #7950f2;
  width: 50%;
  height: 50%;
  animation: grow cubic-bezier(0.785, 0.135, 0.15, 0.86) 3s infinite 0.5s;
}
.small-circle {
  background: #fff;
  width: 50%;
  height: 50%;
  animation: grow cubic-bezier(0.785, 0.135, 0.15, 0.86) 3s infinite 0.8s;
}
@-moz-keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
@-webkit-keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
@-o-keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
@keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  40% {
    opacity: 1;
    transform: scale(1.2) translate(-50%, -50%);
  }
  60% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
}
</style>
