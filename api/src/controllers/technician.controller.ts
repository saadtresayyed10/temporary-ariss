// src/controllers/technician.controller.ts

import { AuthRequest } from '../middleware/auth.middleware.js';
import {
    approveTechnicianService,
    isTechnicianSignedIn,
    registerTechinicianService,
    getAllApprovedTechniciansService,
    getAllDisapprovedTechniciansService,
    disapproveTechnicianService,
} from '../services/technician.service.js';
import { Request, Response } from 'express';

// Controller to register Techinician
export const registerTechinicianController = async (req: Request, res: Response) => {
    try {
        const { phone, email, first_name, last_name, usertype, dealerId, otp } = req.body;

        if (usertype != 'TECHNICIAN') {
            return res.status(404).json({ success: false, message: 'Select proper type: TECHNICIAN' });
        }

        const technician = await registerTechinicianService(
            phone,
            email,
            first_name,
            last_name,
            usertype,
            dealerId,
            otp
        );

        return res.status(201).json({ success: true, data: technician });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message }); // Throw error with message
    }
};

// Controller to check if technician is logged in
export const isTechnicianSignedInController = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized: No user found' });
            return;
        }

        const technician = await isTechnicianSignedIn(req.user.userid);
        if (!technician) {
            res.status(404).json({ message: 'Technician not found' });
            return;
        }

        res.status(200).json(technician);
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message }); // Throw error with message
    }
};

// Controller to approve a technician
export const approveTechnicianController = async (req: Request, res: Response) => {
    try {
        const { dealer_id, tech_id } = req.params;

        if (!dealer_id || !tech_id) {
            res.status(404).json({ message: 'Technician or Dealer not found' });
        }

        const technician = await approveTechnicianService(dealer_id, tech_id);

        return res.status(200).json({ success: true, data: technician });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message }); // Throw error with message
    }
};

// Controller to fetch all approved technicians
export const getAllApprovedTechniciansController = async (req: Request, res: Response) => {
    try {
        const { dealer_id } = req.params;

        if (!dealer_id) {
            return res.status(404).json({ message: 'Dealer with this ID do not exist' });
        }

        const techinicians = await getAllApprovedTechniciansService(dealer_id);

        return res.status(200).json({ success: true, total: techinicians.length, data: techinicians });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message }); // Throw error with message
    }
};

// Controller to fetch all not-approved technicians
export const getAllDisapprovedTechniciansController = async (req: Request, res: Response) => {
    try {
        const { dealer_id } = req.params;

        if (!dealer_id) {
            return res.status(404).json({ message: 'Dealer with this ID do not exist' });
        }

        const techinicians = await getAllDisapprovedTechniciansService(dealer_id);

        return res.status(200).json({ success: true, total: techinicians.length, data: techinicians });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message }); // Throw error with message
    }
};

// Controller to disapprove a technician
export const disapproveTechnicianController = async (req: Request, res: Response) => {
    try {
        const { dealer_id, tech_id } = req.params;

        if (!dealer_id || !tech_id) {
            res.status(404).json({ message: 'Technician or Dealer not found' });
        }

        const technician = await disapproveTechnicianService(dealer_id, tech_id);

        return res.status(200).json({ success: true, data: technician });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message }); // Throw error with message
    }
};
