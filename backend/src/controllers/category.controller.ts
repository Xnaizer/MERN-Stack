import { type Response } from 'express';
import { IPaginationQuery, type IReqUser } from '../utils/interfaces';
import CategoryModel, { categoryDAO } from '../models/category.model'; 
import response from '../utils/response';
import ImageModel from '../models/image.model';
import uploader from '../utils/uploader';


export default {
  async create(req: IReqUser, res: Response) {
    try {
        await categoryDAO.validate(req.body)

        const result = await CategoryModel.create(req.body);
        const imageUpdate = await ImageModel.findByIdAndUpdate(result.iconId,
            {
                status: 'permanent',
                usedBy: 'category'
            },
            {
                new: true
            }
        )
        
        const data = [result, imageUpdate];

        response.success(res,data, 'Success create a category' )
    } catch (error) {
        response.error(res, error, 'Failed create category');
    }
  },

  async findAll(req: IReqUser, res: Response) {
    const {
        page = Number(req.query.page) || 1,
        limit = 10,
        search
    } = req.query as unknown as IPaginationQuery;

    try {
        const query = {};

        if(search) {
            Object.assign(query, {
                $or: [
                    {
                        name: {$regex: search, $options: 'i'}
                    },
                    {
                        description: {$regex: search, $options: 'i'}
                    }
                ]
            });
        }

        const result = await CategoryModel.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({createdAt: -1})
            .exec();

        const count = await CategoryModel.countDocuments(query);

        response.pagination(res, result, {
            totalData: count,
            totalPages: Math.ceil(count / limit),
            current: page
        }, 'Success find all category')


    } catch (error) {
        response.error(res, error, 'Failed  find all category data');
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
        const {id} = req.params;
        const result = await CategoryModel.findById(id);

        if (!result) {
            return response.notFound(res, 'Category not found');
        }

        response.success(res,result, 'Success find one category');

    } catch (error) {
        response.error(res, error, 'Failed find one category data');
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
        const { id } = req.params;

        const result = await CategoryModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        const updateImg = await ImageModel.findByIdAndUpdate(result?.iconId,
            {
                status: 'permanent',
                usedBy: 'category'
            },
            {
                new: true
            }
        )

        if (!result || !updateImg) {
            return response.notFound(res, 'Category not found');
        }

        const data = [result, updateImg]

        response.success(res,data, 'Success update category')

    } catch (error) {
        response.error(res, error, 'Failed update category')
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
        const { id } = req.params;

        const result = await CategoryModel.findByIdAndDelete(id, {
            new: true
        });

        if (!result) {
            return response.notFound(res, 'Category not found');
        }

        const image = await ImageModel.findByIdAndUpdate(result.iconId, {
            status: "temporary"
        });

        const deleteImg = await uploader.removeMedia(result.icon);

        const data = [result, deleteImg, image];

        response.success(res, data, 'Success remove category');
    } catch (error) {
        response.error(res, error, 'Failed remove category');
    }
  },
};
