import * as controller from "./controllers/form-controller.js"
import * as listController from "./controllers/list-controller.js"
import * as modalController from "./controllers/modal-controller.js"
import * as pageController from "./controllers/page-controller.js"

modalController.init()
pageController.init()
controller.animateInput()
controller.init()
listController.init()