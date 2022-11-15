
/**
* @api {get} /schema GET /schema
* @apiVersion 1.0.0
* @apiName GET-/schema
* @apiGroup Default
* @apiPermission Unknown
*
* @apidescription
*   No Description
*

*
* @apiSchema (Query) {jsonschema=../schema/req.query.ListSchema.json} apiParam
*
* @apiSchema {jsonschema=../schema/res.ListSchema.json} apiSuccess
*/


/**
* @api {post} /record Record Stats
* @apiVersion 1.0.0
* @apiName POST-/record
* @apiGroup Record
* @apiPermission user
*
* @apidescription
*   The daily ETL process will push updates to this endpoint
*

*
*
* @apiSchema (Body) {jsonschema=../schema/req.body.Record.json} apiParam
* @apiSchema {jsonschema=../schema/res.Standard.json} apiSuccess
*/
