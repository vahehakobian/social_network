import { MigrationInterface, QueryRunner } from "typeorm"

export class createMigrationFriend1722465607620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION add_user_friend()
            RETURNS TRIGGER AS $add_user_friend$
                BEGIN
   
                    IF NEW.status = 'ACCEPT' THEN
                        INSERT INTO friend (user_id, friend_id)
                            VALUES (NEW.sender_id, NEW.receiver_id);
       
                        INSERT INTO friend (user_id, friend_id)
                        VALUES (NEW.receiver_id, NEW.sender_id);

                        DELETE FROM request
                            WHERE id = NEW.id;
                        ELSE
                            DELETE FROM request
                            WHERE id = NEW.id;
                     END IF;

                    RETURN NEW;

                END;
            $add_user_friend$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE OR REPLACE TRIGGER trigger_add_friend
                AFTER UPDATE OF status ON request
                FOR EACH ROW
                EXECUTE FUNCTION add_user_friend();
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP FUNCTION add_user_friend() CASCADE');
      }

}
