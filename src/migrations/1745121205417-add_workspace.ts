import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkspace1745121205417 implements MigrationInterface {
    name = 'AddWorkspace1745121205417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "created_by" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "workspace_member" ("id" varchar PRIMARY KEY NOT NULL, "role" text NOT NULL DEFAULT ('member'), "joined_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "workspaceId" varchar, "userId" varchar, CONSTRAINT "FK_workspace_user" FOREIGN KEY ("workspaceId") REFERENCES "workspace" ("id") ON DELETE CASCADE, CONSTRAINT "FK_user_workspace" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE)`);
        
        // Thêm cột workspaceId vào bảng users
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "workspaceId" varchar`);

        // Nếu bạn muốn thêm ràng buộc khóa ngoại vào cột này
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_workspace" FOREIGN KEY ("workspaceId") REFERENCES "workspace" ("id") ON DELETE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa ràng buộc khóa ngoại
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_workspace"`);

        // Xóa cột workspaceId trong bảng users
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "workspaceId"`);

        // Xóa bảng workspace_member và workspace
        await queryRunner.query(`DROP TABLE "workspace_member"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
    }
}
