import { Service } from 'typedi';
import { EmployeeModel } from '@/models/employee.model';
import { HttpException } from '@/exceptions/httpException';
import { AgencyModel } from '@/models/agency.model';
import { UserModel } from '@/models/users.model';
import { CreatorModel } from '@models/creator.model';
import { Employee, EmployeeCreate, EmployeeUpdate } from '@/interfaces/employee.interface';
import { Emails } from '@utils/email';
import { hash } from 'bcrypt';
import { Email } from '@/interfaces/common.interface';
import { generateEmailTemplateForActivation } from '../template/activateEmployee';
import mongoose from 'mongoose';
import { Creator } from '@/interfaces/creator.interface';

@Service()
export class EmployeeService {
  // create employee
  public async createEmployee(employeeData: EmployeeCreate, agencyId: string): Promise<Employee> {
    try {
      const agency = await AgencyModel.findOne({ _id: agencyId });
      console.log(agency);
      if (!agency) {
        throw new HttpException(404, 'Agency not found');
      }
      const employeeExist = await EmployeeModel.findOne({ email: employeeData.email, agencyId: agencyId });
      if (employeeExist) {
        throw new HttpException(409, `User already registered`);
      }
      let user = await UserModel.findOne({ email: employeeData.email });
      if (!user) {
        // temp default password for development
        const hashedPassword = await hash('development', 10);
        const payload = {
          firstName: employeeData.name,
          lastName: '',
          email: employeeData.email,
          password: hashedPassword,
          isEmployee: true,
          role: employeeData.role,
          agencyId: agencyId,
        };
        user = await UserModel.create(payload);
      }
      const employee = await EmployeeModel.create({
        name: employeeData.name,
        email: employeeData.email,
        agencyId: agencyId,
        role: employeeData.role,
        userId: user._id,
        status: 'inactive',
      });
      if (typeof employeeData.assignCreator === 'string') {
        const data = await CreatorModel.findOneAndUpdate(
          { _id: new mongoose.Types.ObjectId(employeeData.assignCreator) },
          { $addToSet: { assignEmployee: new mongoose.Types.ObjectId(employee._id) } },
          { returnDocument: 'after' },
        );
        if (!data) {
          throw new HttpException(404, `Creator with ID ${employeeData.assignCreator} not found`);
        }
      } else if (typeof employeeData.assignCreator === 'object') {
        const updatedEmployees = await Promise.all(
          employeeData.assignCreator.map(async id => {
            const data = await CreatorModel.findOneAndUpdate(
              { _id: new mongoose.Types.ObjectId(id) },
              { $addToSet: { assignEmployee: new mongoose.Types.ObjectId(employee._id) } },
              { returnDocument: 'after' },
            );
            if (!data) {
              throw new HttpException(404, `Creator with ID ${id} not found`);
            }
            return data;
          }),
        );
      }
      const template = generateEmailTemplateForActivation(employee, agency.agencyName);
      const emailData: Email = {
        to: employee.email,
        subject: 'Activate Employee Account',
        template: template,
      };
      await new Emails().sendEmail(emailData);
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error?.message || error?.msg);
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // get all employees of a agency
  public async getAgencyEmployees(agencyId: string) {
    try {
      const employees = await EmployeeModel.aggregate([
        {
          $match: { agencyId: new mongoose.Types.ObjectId(agencyId) },
        },
        {
          $lookup: {
            from: 'creators',
            localField: '_id',
            foreignField: 'assignEmployee',
            as: 'creatorName',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            status: 1,
            userId: 1,
            agencyId: 1,
            assignedCreators: {
              $map: {
                input: '$creatorName',
                as: 'creator',
                in: {
                  id: '$$creator._id',
                  name: '$$creator.creatorName',
                },
              },
            },
          },
        },
      ]);
      return employees;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, `${error.message}`);
    }
  }

  // get employee by employee id
  public async getEmployeeById(employeeId: string) {
    try {
      const employee = await UserModel.findOne({ _id: employeeId });
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // update employee by an employee id
  public async updateEmployee(employeeId: string, employeeData: EmployeeUpdate) {
    try {
      let hashedPassword: string;
      if (employeeData.password) {
        hashedPassword = await hash(employeeData.password, 10);
      }
      console.log(employeeId);
      const employee = await EmployeeModel.findOneAndUpdate(
        { _id: employeeId },
        {
          $set: {
            name: employeeData.name,
            email: employeeData.email,
            role: employeeData.role,
            agencyId: employeeData.agencyId,
            status: employeeData.status,
            password: hashedPassword,
          },
        },
        { returnDocument: 'after' },
      );
      if (employeeData.assignCreator) {
        if (typeof employeeData.assignCreator === 'string') {
          const data = await CreatorModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(employeeData.assignCreator) },
            { $addToSet: { assignEmployee: new mongoose.Types.ObjectId(employee._id) } },
            { returnDocument: 'after' },
          );
          if (!data) {
            throw new HttpException(404, `Creator with ID ${employeeData.assignCreator} not found`);
          }
        } else if (typeof employeeData.assignCreator === 'object') {
          const updatedEmployees = await Promise.all(
            employeeData.assignCreator.map(async id => {
              const data = await CreatorModel.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(id) },
                { $addToSet: { assignEmployee: new mongoose.Types.ObjectId(employee._id) } },
                { returnDocument: 'after' },
              );
              if (!data) {
                throw new HttpException(404, `Creator with ID ${id} not found`);
              }
              return data;
            }),
          );
        }
      }
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // delete employees by employee id
  public async deleteEmployee(employeeId: string) {
    try {
      const deleteEmployee = await EmployeeModel.findByIdAndDelete(employeeId);
      return deleteEmployee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // assign role to employee
  public async assignRoleToEmployee(employeeId: string, role: string) {
    try {
      const updateObj = {
        role,
      };
      if (role === 'admin') {
        Object.assign(updateObj, {
          isEmployee: false,
          isAdmin: true,
        });
      }
      const employee = await EmployeeModel.findByIdAndUpdate(
        employeeId,
        {
          $set: updateObj,
          $inc: { __v: 1 },
        },
        { new: true },
      );
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  public async getEmployees(getData: any) {
    try {
      let filter = {};
      if (getData.creator) {
        const employeesId: Creator = (await CreatorModel.findOne({ _id: getData.creator })) as Creator;
        filter = { _id: { $in: employeesId.assignEmployee } };
        console.log('--------', employeesId);
      }
      if (getData.name) {
        filter = {
          ...filter,
          name: new RegExp(`${getData.name}`, 'i'),
        };
      }
      if (getData.status) {
        filter = {
          ...filter,
          status: getData.status,
        };
      }

      const employees = await EmployeeModel.aggregate([
        {
          $match: filter,
        },
        {
          $lookup: {
            from: 'creators',
            localField: '_id',
            foreignField: 'assignEmployee',
            as: 'creatorName',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            status: 1,
            userId: 1,
            agencyId: 1,
            assignedCreators: '$creatorName.creatorName',
          },
        },
      ]);
      return employees;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  //Batch operations update

  public async updateBatchEmployee(employeeId: string[], employeeRole: string | undefined, agencyId: string | undefined) {
    try {
      const updateFields: any = {};

      if (employeeRole) {
        updateFields.role = employeeRole;
      }

      if (agencyId) {
        updateFields.agencyId = agencyId;
      }

      const updatedEmployees = await Promise.all(
        employeeId.map(async id => {
          const employee = await EmployeeModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

          if (!employee) {
            throw new HttpException(404, `Employee with ID ${id} not found`);
          }
          return employee;
        }),
      );

      return updatedEmployees;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  public async deleteBatchEmployeesByIds(employeeIds: string[]) {
    try {
      const employeeObjectIds = employeeIds.map(id => new mongoose.Types.ObjectId(id));
      const deletedEmployees = await EmployeeModel.deleteMany({ _id: { $in: employeeObjectIds } });
      if (deletedEmployees.deletedCount === 0) {
        throw new HttpException(404, 'No matching employees found for deletion');
      }
      return deletedEmployees;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }
}
