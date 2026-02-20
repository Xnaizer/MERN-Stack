import { type Response } from 'express';
import { IPaginationQuery, type IReqUser } from '../utils/interfaces';
import EventModel, { eventDAO, TEvent } from '../models/event.model';
import response from '../utils/response';
import { FilterQuery } from 'mongoose';

export default {
  async createEvent(req: IReqUser, res: Response) {
    try {
      const payload = { ...req.body, createdBy: req.user?.id } as TEvent;

      await eventDAO.validate(payload);

      const result = await EventModel.create(payload);

      return response.success(res, result, 'Success create an event');
    } catch (error) {
      return response.error(res, error, 'Failed Create an event');
    }
  },

  async findAllEvent(req: IReqUser, res: Response) {
    try {
      const {
        page = Number(req.query.page) || 1,
        limit = 10,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TEvent> = {};

      if (search) {
        Object.assign(query, {
          $text: {
            $search: search,
          },
        });
      }

      const result = await EventModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate("category", "-_id name icon")
        .populate("createdBy", "-_id fullName email")
        .exec();

      const count = await EventModel.countDocuments(query);

      return response.pagination(
        res,
        result,
        {
          current: page,
          totalData: count,
          totalPages: Math.ceil(count / limit),
        },
        'Success find all event data',
      );
    } catch (error) {
      return response.error(res, error, 'Failed find all event');
    }
  },

  async findOneEvent(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await EventModel.findById(id);

      if (!result) {
        return response.notFound(res, 'Event not found');
      }

      return response.success(res, result, 'Success find an event');
    } catch (error) {
      return response.error(res, error, 'Failed find an event');
    }
  },

  async updateEvent(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await EventModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) {
        return response.notFound(res, 'Event not found');
      }

      return response.success(res, result, 'Success update an event');
    } catch (error) {
      return response.error(res, error, 'Failed update an event');
    }
  },

  async removeEvent(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await EventModel.findByIdAndDelete(id, {
        new: true,
      });

      if (!result) {
        return response.notFound(res, 'Event not found');
      }

      return response.success(res, result, 'Success remove an event');
    } catch (error) {
      return response.error(res, error, 'Failed remove an event');
    }
  },

  async findOneEventBySlug(req: IReqUser, res: Response) {
    try {
      const { slug } = req.params;

      const result = await EventModel.findOne({
        slug,
      });

      if (!result) {
        return response.notFound(res, 'Event not found');
      }

      return response.success(res, result, 'Success find an event by slug');
    } catch (error) {
      return response.error(res, error, 'Failed find one event by slug');
    }
  },
};
