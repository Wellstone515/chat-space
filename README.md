DB設計


 users table

 | Column |  Type  |   Options
 |--------|--------|---------------------------------------
 | name   | string | index: true, null: false, unique: true
 | mail   | string | null: false, unique: true

 Association

  ・ has_many :groups, through: :members
  ・ has_many :members
  ・ has_many :messages



 groups table

 |    Column    |  Type  |   Options
 |--------------|--------|------------------
 | group_name   | string | null: false

 Association

  ・ has_many :users, through: :members
  ・ has_many :members
  ・ has_many :messages



 messages table

 |  Column  |   Type   |   Options
 |----------|----------|--------------
 | body     | text     |
 | image    | string   |
 | group_id | integer  | null: false, foreign_key: true
 | user_id  | integer  | null: false, foreign_key: true

 Association

  ・ belongs_to :user
  ・ belogns_to :group



 members table

 |   Column   |   Type  |   Options
 |------------|---------|---------------------------------------
 | user_id    | integer | null: false, foreign_key: true
 | group_id   | integer | null: false, foreign_key: true

 Association

  ・ belongs_to :user
  ・ belongs_to :group

