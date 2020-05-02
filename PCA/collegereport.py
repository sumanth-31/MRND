import click
import MySQLdb as sql
from smtplib import SMTP
from email.mime.text import MIMEText
import ssl
@click.command()
@click.argument('acr',nargs=1)
@click.argument('frommail',nargs=1)
@click.argument('password',nargs=1)
@click.argument('tomail',nargs=1)
def sendreport(acr,frommail,password,tomail):
    smtpServer='smtp.gmail.com'
    conn=sql.connect(host='localhost',user='root',passwd='root',port=8082,db='mrnd')
    cursor=conn.cursor()
    cursor.execute("select students.name , m.marks from students,marks m where students.college= %s and students.pkrow=m.student;",[acr])
    part1=cursor.fetchall()
    cursor.execute("select count(students.name), min(m.marks), max(m.marks) ,avg(m.marks) from students, marks m where students.college= %s and students.pkrow=m.student;",[acr])
    part2=cursor.fetchall()
    cursor.execute("select students.name, students.college, m.marks from students, marks m where students.pkrow=m.student;")
    part3=cursor.fetchall()
    part1string='name\tmarks\t\n'
    for row in part1:
        for col in row:
            part1string+=str(col)+'\t'
        part1string+='\n'
    part2string='studentCount\tminMarks\tmaxMarks\tavgMarks\t\n'
    for row in part2:
        for col in row:
            part2string+=str(col)+'\t'
        part2string+='\n'
    part3string='Name\tCollege\tMarks\n'
    for row in part3:
        for col in row:
            part3string+=str(col)+'\t'
        part3string+='\n'
    content='Student marks summary:\n'+part1string+'\nCollege Summary:\n'+part2string+'\nGlobal Summary:\n'+part3string
    msg=MIMEText(content,'plain')
    msg['Subject']='PCA 6'
    msg['From']='Sumanth'
    conn=SMTP(smtpServer,587)
    conn.ehlo()
    conn.starttls()
    conn.ehlo()
    conn.login(user=frommail,password=password)
    try:
        conn.sendmail(frommail,tomail,msg=msg.as_string())
    except Exception as e:
        print(e)
sendreport()