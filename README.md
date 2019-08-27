# DB設計


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|varcahr(255)|null: false, foreign_key: true|
|e-mails|varchar(255)|null: false, foreign_key: true|
|pass|varchar(255)|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups,through: :groups_users
- has_many :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|varchar(255)|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users,through: :groups_users
- has_many :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: true|
|image|text|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
