# messenger

To start application:
1. npm install
2. Create DB: npx db-migrate db:create messenger_development
3. Run migrations: 
 - (if run for the very first time) npx db-migrate up -c 1
 - npx db-migrate up
3. npm run dev
4. http://localhost:3000

How to create a Pull Request:
1. Create a new branch: git checkout -b new-branch
2. git add .
3. git commit -m "Here goes your comment"
4. git rebase -i main
5. In vim: "shift + :"
6. wq + enter
7. git push origin new-branch
8. Now go to github and create a Pull Request
9. Merge PR to main branch
10. Go to your console and delete the obsolete branch:
 - git branch -D new-branch

 How to run tests in console:
 npm run test