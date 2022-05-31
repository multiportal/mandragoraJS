import { consoleLocal } from "../app/functions";
import Pages from "../controllers/index";

const router = async (hash, hash2) => {
  console.log('hash=>' + hash);
  let page = hash2.replace('#/', '');
  let content = document.getElementById('app-modulo');
  content.innerHTML = '';

  switch (hash) {
    case "#/": {
      return content.appendChild(Pages(page));
    }
    case "#/nosotros": {
      return content.appendChild(Pages(page));
    }
    case "#/productos": {
      return content.appendChild(Pages(page));
    }
    case "#/contacto": {
      return content.appendChild(Pages(page));
    }
    case "#/dashboard": {
      return content.appendChild(Pages(page));
    }
    case "#/forget": {
      return content.appendChild(Pages(page));
    }
    case "#/login": {
      return content.appendChild(Pages(page));
    }
    case "#/logout": {
      return content.appendChild(Pages(page));
    }
    case "#/register": {
      return content.appendChild(Pages(page));
    }
    default: {
      return content.appendChild(Pages('404'));
    }
  }
}

export { router };