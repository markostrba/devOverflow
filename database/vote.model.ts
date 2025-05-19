import { Schema, Types, model, models } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: string;
  voteType: string;
}

const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id: { type: Schema.Types.ObjectId, ref: "Answer", required: true },
    type: { type: String, enum: ["question", "answer"], required: true },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = models?.vote || model<IVote>("Vote", VoteSchema);
export default Vote;
