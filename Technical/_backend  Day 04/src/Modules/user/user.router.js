import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user.controller.js';
import { getUserPosts } from '../post/post.controller.js';

const router = Router();

router.get('/',            getAllUsers);
router.get('/:id',         getUserById);
router.get('/:id/posts',   getUserPosts);   
router.post('/',           createUser);
router.put('/:id',         updateUser);
router.delete('/:id',      deleteUser);

export default router;