const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
  } = require('../../controllers/thoughtController');
  
  // /api/thoughts GET POST
  router.route("/").get(getThoughts).post(createThought);
  
  // /api/thoughts/:id GET PUT DELETE
  router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);
  
  // /api/thoughts/:thoughtId/reactions POST DELETE
  router.route("/:thoughtId/reactions").post(addReaction);
  router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
    
  module.exports = router;