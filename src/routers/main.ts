import { Router } from "express"
import * as pingController from "../controllers/ping";
import * as authController from "../controllers/auth";
import * as tweetController from "../controllers/tweet";
import { verifyJWT } from "../utils/jwt";
import * as userController from "../controllers/user";
import * as feedController from "../controllers/feed";
import * as searchControlller from "../controllers/search";
import * as trendController from "../controllers/trend";
import * as suggestionController from "../controllers/suggestion";

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);
mainRouter.get('/privatePing', verifyJWT, pingController.privatePing);

// Rotas de cadastro & Login
mainRouter.post('/auth/signup', authController.signup);
mainRouter.post('/auth/signin', authController.signin);

// Rotas de gestão do Tweet e dar Like

mainRouter.post('/tweet', verifyJWT, tweetController.addTweet);
mainRouter.get('/tweet/:id', verifyJWT, tweetController.getTweet);
mainRouter.get('/tweet/:id/answers', verifyJWT, tweetController.getAnwers);
mainRouter.post('/tweet/:id/like', verifyJWT, tweetController.likeToggle);

// Usuários

mainRouter.get('/user/:slug', verifyJWT, userController.getUser);
mainRouter.get('/user/:slug/tweets', verifyJWT, userController.getUserTweet);
mainRouter.post('/user/:slug/follow', verifyJWT, userController.followToggle);
mainRouter.put('/user', verifyJWT,userController.updateUser );
//mainRouter.put('/user/avatar');
//mainRouter.put('/user/cover');

// Rotas do Sistema

mainRouter.get('/feed', verifyJWT, feedController.getFeed);
mainRouter.get('/search', verifyJWT, searchControlller.searchTweed);
mainRouter.get('/trending', verifyJWT, trendController.getTrends);
mainRouter.get('/suggestions', verifyJWT, suggestionController.getSuggestions);