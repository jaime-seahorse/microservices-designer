Feature: user API

    Background:
        Given The following data:
            | tableName | sqlFile     | csvFile     |
            | address   | address.sql | address.csv |
            | user      | user.sql    | user.csv    |


    Scenario Outline: Get Url Path
        When GET "<url>" path
        Then The http response status to be <status>
        And The http response body to be like content of "<jsonFile>" file
        Examples:
            | url              | status | jsonFile       |
            | /api/v1/user     | 200    | user.list.json |
            | /api/v1/user/1   | 200    | user.1.json    |
            | /api/v1/user/404 | 404    | user.404.json  |