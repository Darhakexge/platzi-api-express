const { Router } = require("express");
const ProductsService = require("./../services/product.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createSchema, updateSchema, getSchema } = require("./../schemas/product.schema");

const router = Router();
const service = new ProductsService();

router.get("/", async (req, res) => {
    const products = await service.find();
    res.json(products);
});

router.get(
    "/:id",
    validatorHandler(getSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);

            res.json(product);
        } catch (error) {
            next(error);
        }
    });

router.post(
    "/",
    validatorHandler(createSchema, "body"),
    async (req, res) => {
        const body = req.body;

        const product = await service.create(body);

        res.status(201).json(product);
    });

router.patch(
    "/:id",
    validatorHandler(getSchema, "params"),
    validatorHandler(updateSchema, "body"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);

            res.json(product);
        } catch (error) {
            next(error);
        }
    });

router.delete(
    "/:id",
    validatorHandler(getSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const product = await service.delete(id);

            res.json(product);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
