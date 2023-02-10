import { ObjectType, Field, Resolver, Mutation, Args, Ctx, ArgsType, Query } from "type-graphql";

@ObjectType()
export class User {
	@Field()
	id: string;

	@Field({
		nullable: true
	})
	firstName?: string;

	@Field({
		nullable: true
	})
	lastName?: string;

	@Field()
	email: string;

	password: string;
}


@ArgsType()
export class LoginUserArgs {
	@Field()
	email: string;

	@Field()
	password: string;
}


@Resolver(User)
export class UserResolver {
	@Query(() => User, {
		nullable: true
	})
	async me(@Ctx() ctx) {
		if (!ctx.req.session.userId) {
			return null
		}

		return {
			id: "1234",
			email: "test@test.com",
			firstName: "test",
			lastName: "test"
		}
	}
	
  @Mutation(() => User)
	async loginUser(
		@Args()
		{ email, password }: LoginUserArgs,
		@Ctx() ctx,
	) {

    if(email !== "test@test.com" && password !== "test"){
      throw new Error("Invalid credentials")
    }

		ctx.req.session.userId = "1234"

		return {
      id: "1234",
      email: "test@test.com",
      firstName: "test",
      lastName: "test"
    }
	}
}