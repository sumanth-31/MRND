import click



@click.group()
@click.option('-rd/-nrd','--removedigits/--no-removedigits',default=False,help='removes digits from concatenated string')
@click.pass_context
def main(ctx,removedigits):
    ctx.ensure_object(dict)
    ctx.obj['rd']=removedigits
    click.echo('Welcome to string manipulation tool')



@main.command()
@click.option('-d','--delimitor',default=':',help='seperator for concatenation')
@click.argument('strings',nargs=-1)
@click.pass_context
def concat(ctx,delimitor,strings):
    '''pass one or more strings, concat them with delimiter  and print them out'''
    string=delimitor.join(strings)
    if(ctx.obj['rd']):
        string=removeDigits(string)
    click.echo(string)



@main.command()
@click.argument('string')
@click.pass_context
def lower(ctx,string):
    '''converts the word to lower case'''
    string= removeDigits(string) if ctx.obj['rd'] else string
    click.echo(string.lower())

@main.command()
@click.argument('string')
@click.pass_context
def upper(ctx,string):
    '''converts the word to upper case'''
    string= removeDigits(string) if ctx.obj['rd'] else string
    click.echo(string.upper())


def removeDigits(string):
    res=''.join([i for i in string if not i.isdigit()])
    return res
main()