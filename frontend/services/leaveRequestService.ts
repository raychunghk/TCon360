
import axios, { AxiosResponse } from 'axios';

// Define interfaces for leave request data
interface LeaveRequestData {
  id?: number;
  leavePeriodStart: Date | null;
  leavePeriodEnd: Date | null;
  AMPMStart: string;
  AMPMEnd: string;
  leaveDays: number;
  dateOfReturn: Date | null;
  staffSignDate: Date;
  leavePurpose: string;
  leaveType: string;
  contractId: number;
  staffId?: number;
  fileId?: number;
  error?: Record<string, string> | null;
  helper?: Record<string, string> | null;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Service functions
export const leaveRequestService = {
  async getLeaveRequest(id: number, token: string, basepath: string): Promise<AxiosResponse<LeaveRequestData>> {
    try {
      return await axios.get(`${basepath}/api/leaverequest/${id}`, {
        headers: { Authorization: `Bearer ${ token } ` },
      });
    } catch (error) {
      throw error; // Let the caller handle the error
    }
  },

  async createLeaveRequest(data: LeaveRequestData, token: string, basepath: string): Promise<AxiosResponse<LeaveRequestData>> {
    try {
      return await axios.post(`${basepath}/api/leaverequest/`, data, {
        headers: { Authorization: `Bearer ${ token } ` },
      });
    } catch (error) {
      throw error;
    }
  },

  async updateLeaveRequest(id: number, data: LeaveRequestData, token: string, basepath: string): Promise<AxiosResponse<LeaveRequestData>> {
    try {
      return await axios.put(`${basepath}/api/leaverequest/${id}`, data, {
        headers: { Authorization: `Bearer ${ token } ` },
      });
    } catch (error) {
      throw error;
    }
  },

  async deleteLeaveRequest(id: number, token: string, basepath: string): Promise<AxiosResponse<void>> {
    try {
      return await axios.delete(`${basepath}/api/leaverequest/${id}`, {
        headers: { Authorization: `Bearer ${ token } ` },
      });
    } catch (error) {
      throw error;
    }
  },
};
