/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //USERS CONTROLLER
  "POST /users/user": "UsersController.user_create",
  'POST /users/login': 'UsersController.login',
  'GET /users/user': 'UsersController.user_profile',
  'PUT /users/user': 'UsersController.user_update',
  'DELETE /users/user': 'UsersController.user_delete',
  'PUT /users/changepass': 'UsersController.user_change_password',

  //STUDENTS CONTROLLER
  "POST /students/student": "StudentsController.stu_create",
  "PUT /students/update-student": "StudentsController.stu_update",
  "DELETE /students/del-student": "StudentsController.stu_del",
  "GET /students/student": "StudentsController.stu_list",
  "POST /students/upload-avatar": "StudentsController.stu_upload_avatar",
  "POST /students/student-room": "StudentsController.stu_list_in_room",
  "POST /students/pick-room": "StudentsController.pick_room",
  "PUT /students/swap-room": "StudentsController.swap_room",
  "PUT /students/end-room": "StudentsController.end_room",
  "POST /students/search-stu": "StudentsController.search_stu",
  "POST /students/text-stu": "StudentsController.textcheck_stu",
  "GET /students/list-id": "StudentsController.list_id_stu",


  //Faculties controller
  "POST /faculties/faculty": "FacultiesController.fal_create",
  "GET /faculties/faculty": "FacultiesController.fal_get",
  "DELETE /faculties/del-faculty": "FacultiesController.fal_del",

  //Rooms Controller
  "POST /rooms/room": "RoomsController.add_Room",
  "GET /rooms/room": "RoomsController.list_room",
  "DELETE /rooms/del-room": "RoomsController.del_room",
  "PUT /rooms/update-room": "RoomsController.update_room",
  "POST /rooms/find-room": "RoomsController.find_room",
  "POST /rooms/type-room": "RoomsController.find_room_s",
  "PUT /rooms/update-price": "RoomsController.update_price",

  //Areas Controller
  "POST /areas/area": "AreasController.add_area",
  "DELETE /areas/del-area": "AreasController.del_area",
  "GET /areas/area": "AreasController.get_area",
  "PUT /areas/update-area": "AreasController.update_area",

  //Classes Controller
  "POST /classes/class": "ClassesController.add_class",
  "DELETE /classes/del-class": "ClassesController.del_class",
  "PUT /classes/update-class": "ClassesController.update_class",
  "GET /classes/class": "ClassesController.list_class",

  //Floors Controller
  "POST /floors/floor": "FloorsController.add_floor",
  "DELETE /floors/del-floor": "FloorsController.del_floor",
  "GET /floors/floor": "FloorsController.list_floor",



  //recontract Contractregulations Controller
  "POST /recs/rec": "ContractregulationsController.add_recontract",
  "PUT /recs/update-rec": "ContractregulationsController.update_recontract",
  "DELETE /recs/del-rec": "ContractregulationsController.del_recontract",
  "GET /recs/rec": "ContractregulationsController.list_recontract",
  "GET /recs/rec-enable": "ContractregulationsController.list_recontract_enable",

  //Contract Controller
  "POST /contracts/contract": "ContractsController.add_contract",
  "DELETE /contracts/del-contract": "ContractsController.del_contract",
  "PUT /contracts/update-contract": "ContractsController.update_contract",
  "GET /contracts/list-contract": "ContractsController.list_contract",
  "GET /contracts/list-contract-old": "ContractsController.list_contract_old",
  "POST /contracts/chart-contract": "ContractsController.chart_contract",
  "POST /contracts/find-contract":"ContractsController.find_contract",
  "POST /contracts/find-contract-old":"ContractsController.find_contract_old",
  // "POST /test/test": "ContractsController.add_test",

  //Register Controller
  "POST /registers/register": "RegistersController.add_register",
  "PUT /registers/disable-register": "RegistersController.disable_register",
  "DELETE /registers/del-register": "RegistersController.del_register",
  "DELETE /registers/del-all": "RegistersController.del_all",
  "GET /registers/list-disable": "RegistersController.list_disable",
  "GET /registers/list-enable": "RegistersController.list_enable",

  //Service Controller
  "POST /services/service": "ServicesController.add_service",
  "DELETE /services/del-service": "ServicesController.del_service",
  "GET /services/service": "ServicesController.list_service",
  "GET /services/service-enable": "ServicesController.list_service_enable",
  "GET /services/new-service": "ServicesController.get_new",
  "PUT /services/update-service": "ServicesController.update_service",

  //Bill Controller
  "POST /bills/bill": "BillsController.add_bill",
  "PUT /bills/update-bill": "BillsController.update_bill",
  "DELETE /bills/del-bill": "BillsController.del_bill",
  "GET /bills/bill": "BillsController.list_bill",
  "PUT /bills/new-bill": "BillsController.bill_new",
  "PUT /bills/total-bill": "BillsController.total_bill",
  "POST /bills/find-bill": "BillsController.find_bill",

  //BillserviceDetaills Controller
  "POST /bss/bs": "Billservicedetails.add_bs",
  "DELETE /bss/del-bs": "Billservicedetails.del_bs",
  "GET /bss/bs": "Billservicedetails.list_bs",
  "POST /bss/bsById": "Billservicedetails.list_bsById",

  // RuleController
  "POST /rules/rule": "RulesController.add_rule",
  "PUT /rules/update-rule": "RulesController.update_rule",
  "DELETE /rules/del-rule": "RulesController.del_rule",
  "GET /rules/rule": "RulesController.list_rule",

  // ElecController
  "POST /elecs/elec": "ElecsController.add_elec",
  "DELETE /elecs/del-elec": "ElecsController.del_elec",
  "PUT /elecs/update-elec": "ElecsController.update_elec",
  "GET /elecs/elec-enable": "ElecsController.get_elec_enable",
  "GET /elecs/elec-disable": "ElecsController.get_elec_disable",
  "POST /elecs/elec-enable-month": "ElecsController.get_elec_month",
  "POST /elecs/elec-disable-month": "ElecsController.get_elec_month_diable",
  "PUT /elecs/check-disable": "ElecsController.check_disable",
  "PUT /elecs/check-enable": "ElecsController.check_enable",
  "POST /elecs/find-elec-enable": "ElecsController.find_elec_enable",
  "POST /elecs/find-elec-disable": "ElecsController.find_elec_disable",

  //News Controller
  "POST /news/news": "NewsController.add_news",
  "POST /news/upload-picture": "NewsController.news_upload_picture",
  "DELETE /news/del-news": "NewsController.del_news",
  "PUT /news/update-news": "NewsController.update_news",
  "GET /news/news": "NewsController.list_news",




  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
