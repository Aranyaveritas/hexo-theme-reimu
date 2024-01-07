$(document).ready(function () {
  window.addEventListener('pjax:success', () => {
    $('script[data-pjax]').each(function () {
      const element = $(this).get(0)
      const { text, parentNode, id, className, type, src, dataset } = element
      const code = text || element.textContent || element.innerHTML || ''
      parentNode.removeChild(element)
      const script = document.createElement('script')
      if (id) {
        script.id = id
      }
      if (className) {
        script.className = className
      }
      if (type) {
        script.type = type
      }
      if (src) {
        // Force synchronous loading of peripheral JS.
        script.src = src
        script.async = false
      }
      if (dataset.pjax !== undefined) {
        script.dataset.pjax = ''
      }
      if (code !== '') {
        script.appendChild(document.createTextNode(code))
      }
      parentNode.appendChild(script)
    })
  })
});