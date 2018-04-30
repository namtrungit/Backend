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
  "GET /students/student-room": "StudentsController.stu_list_in_room",
  "POST /students/pick-room": "StudentsController.pick_room",
  "PUT /students/swap-room": "StudentsController.swap_room",
  "PUT /students/end-room": "StudentsController.end_room",
  "POST /students/search-stu":"StudentsController.search_stu",

  //Faculties controller
  "POST /faculties/faculty": "FacultiesController.fal_create",
  "GET /faculties/faculty": "FacultiesController.fal_get",
  "DELETE /faculties/del-faculty": "FacultiesController.fal_del",

  //Rooms Controller
  "POST /rooms/room": "RoomsController.add_Room",
  "GET /rooms/room": "RoomsController.list_room",
  "DELETE /rooms/del-room": "RoomsController.del_room",
  "PUT /rooms/update-room": "RoomsController.update_room",
  "GET /rooms/find-room": "RoomsController.find_room",
  "POST /rooms/type-room": "RoomsController.find_room_s",

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

  //AF Details Controller
  "POST /afds/afd":"AreafloordetailsController.add_afd",
  "DELETE /afds/del-afd":"AreafloordetailsController.del_afd",
  "PUT /afds/update-afd":"AreafloordetailsController.update_afd",
  "GET /afds/afd":"AreafloordetailsController.list_afd",
  "GET /afds/afdByAreaId":"AreafloordetailsController.list_afdByAreaId",

  
  //recontract Contractregulations Controller
  "POST /recs/rec":"ContractregulationsController.add_recontract",
  "PUT /recs/update-rec":"ContractregulationsController.update_recontract",
  "DELETE /recs/del-rec":"ContractregulationsController.del_recontract",
  "GET /recs/rec":"ContractregulationsController.list_recontract",
  "GET /recs/rec-enable":"ContractregulationsController.list_recontract_enable",

  //Contract Controller
  "POST /contracts/contract":"ContractsController.add_contract",
  "DELETE /contracts/del-contract":"ContractsController.del_contract",
  "PUT /contracts/update-contract":"ContractsController.update_contract",
  "GET /contracts/list-contract":"ContractsController.list_contract",




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
