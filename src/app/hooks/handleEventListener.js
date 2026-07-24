/* ==========================
  HANDLE EVENT LISTENER
========================== */
const controllers = [];

export const handleEventListener = (evento, fn, selector) => {
  const controller = new AbortController();
  controllers.push(controller);
  (selector ?? document).addEventListener(
    evento,
    fn,
    { signal: controller.signal }
  );
  return controller;
};

export const destroyEvents = () => {
  controllers.forEach(c => c.abort());
  controllers.length = 0;
};

export function destroy(controller) {
  controller?.abort();
  controller = null;
}