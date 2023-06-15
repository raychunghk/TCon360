import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { Post } from '../../../models/Post';
import { PostUser } from '../../../models/PostUser';
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Post)
export class PostRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => PostUser, {
    nullable: false,
  })
  async author(
    @TypeGraphQL.Root() post: Post,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<PostUser> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .post.findUniqueOrThrow({
        where: {
          id: post.id,
        },
      })
      .author({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
