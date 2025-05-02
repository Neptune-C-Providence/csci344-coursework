import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post
from views import get_authorized_user_ids


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        bookmarks = Bookmark.query.filter_by(user_id=self.current_user.id).all()
        data = [b.to_dict() for b in bookmarks]
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )

    def post(self):
        try:
            post_id = int(request.json.get("post_id"))
        except:
            return Response(
                json.dumps({"message": "post_id must be an integer"}),
                mimetype="application/json",
                status=400,
            )

        post_id = request.json.get("post_id")

        if not post_id:
            return Response(
                json.dumps({"message": "post_id is required."}),
                mimetype="application/json",
                status=400,
            )

        post = Post.query.get(post_id)
        if not post or post.user_id not in get_authorized_user_ids(self.current_user):
            return Response(
                json.dumps({"message": "Post not found."}),
                mimetype="application/json",
                status=404,
            )

        existing = Bookmark.query.filter_by(user_id=self.current_user.id, post_id=post_id).first()
        if existing:
            return Response(
                json.dumps({"message": "Already bookmarked."}),
                mimetype="application/json",
                status=400,
            )

        bookmark = Bookmark(user_id=self.current_user.id, post_id=post_id)
        db.session.add(bookmark)
        db.session.commit()
        return Response(
            json.dumps(bookmark.to_dict()),
            mimetype="application/json",
            status=201,
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        bookmark = Bookmark.query.get(id)

        if not bookmark or bookmark.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Bookmark not found."}),
                mimetype="application/json",
                status=404,
            )

        db.session.delete(bookmark)
        db.session.commit()
        return Response(
            json.dumps({"message": f"Bookmark id={id} deleted."}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )